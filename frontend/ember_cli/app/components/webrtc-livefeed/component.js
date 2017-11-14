import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    const signalling_server_hostname =  "192.168.1.202";
    var signalling_server_address = signalling_server_hostname + ':' + '3080';

    var ws = null;
    var pc;
    var pcConfig = {"iceServers": [
    {"urls": ["stun:stun.l.google.com:19302", "stun:" + signalling_server_hostname + ":3478"]}
    ]};
    var mediaConstraints = {
      optional: [],
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      }
    };


    function createPeerConnection() {
      try {
        var pcConfig_ = pcConfig;
        console.log(JSON.stringify(pcConfig_));
        pc = new RTCPeerConnection(pcConfig_, {});
        pc.onicecandidate = onIceCandidate;
        pc.onaddstream = onRemoteStreamAdded;
        pc.onremovestream = onRemoteStreamRemoved;
        console.log("peer connection successfully created!");
      } catch (e) {
        console.error("createPeerConnection() failed");
      }
    }

    function onIceCandidate(event) {
      if (event.candidate) {
        var candidate = {
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        };
        var request = {
          what: "addIceCandidate",
          data: JSON.stringify(candidate)
        };
        ws.send(JSON.stringify(request));
      } else {
        console.log("End of candidates.");
      }
    }

    function onRemoteStreamAdded(event) {
      console.log("Remote stream added:", URL.createObjectURL(event.stream));
      // FIXME encapsulate this component and use this.$
      var remoteVideoElement = document.getElementById('remote-video');
      // var remoteVideoElement = this.$('#remote-video').get(0);
      remoteVideoElement.src = URL.createObjectURL(event.stream);
      remoteVideoElement.play();
    }

    function onRemoteStreamRemoved(event) {
      // FIXME
      var remoteVideoElement = document.getElementById('remote-video');
      // var remoteVideoElement = this.$('#remote-video').get(0);
      remoteVideoElement.src = '';
    }

    function start() {
      document.documentElement.style.cursor = 'wait';

      var protocol = location.protocol === "https:" ? "wss:" : "ws:";
      ws = new WebSocket(protocol + '//' + signalling_server_address + '/stream/webrtc');

      function call(stream) {
        createPeerConnection();
        if (stream) {
          pc.addStream(stream);
        }
            // experimental changes by Jedrek
            var request = {
              what: "call",
              options: {
                force_hw_vcodec: false,
                vformat: "30"
              }
            };
            ws.send(JSON.stringify(request));
            console.log("call(), request=" + JSON.stringify(request));
          }

          ws.onopen = function () {
            call();
          };

          ws.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            var what = msg.what;
            var data = msg.data;

            switch (what) {
              case "offer":
              pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(data)),
                function onRemoteSdpSuccess() {
                  console.log('onRemoteSdpSucces()');
                  pc.createAnswer(function (sessionDescription) {
                    pc.setLocalDescription(sessionDescription);
                    var request = {
                      what: "answer",
                      data: JSON.stringify(sessionDescription)
                    };
                    ws.send(JSON.stringify(request));
                    console.log(request);

                  }, function (error) {
                    alert("Failed to createAnswer: " + error);

                  }, mediaConstraints);
                },
                function onRemoteSdpError(event) {
                  alert('Failed to set remote description (unsupported codec on this browser?): ' + event);
                  stop();
                }
                );

              var request = {
                what: "generateIceCandidates"
              };
              console.log(request);
              ws.send(JSON.stringify(request));
              break;

              case "iceCandidates":
              var candidates = JSON.parse(msg.data);
              for (var i = 0; candidates && i < candidates.length; i++) {
                var elt = candidates[i];
                let candidate = new RTCIceCandidate({sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate});
                pc.addIceCandidate(
                  candidate,
                  () => console.log("IceCandidate added: " + JSON.stringify(candidate)),
                  (error) => console.error("addIceCandidate error: " + error)
                  );
              }
              document.documentElement.style.cursor = 'default';
              break;
              case "message":
              alert(msg.data);
              break;
            }
          };

          ws.onclose = function (evt) {
            if (pc) {
              pc.close();
              pc = null;
            }
            document.documentElement.style.cursor = 'default';
          };

          ws.onerror = function (evt) {
            alert("An error has occurred!");
            ws.close();
          };
        }

        function stop() {
          // FIXME
          var remoteVideoElement = document.getElementById('remote-video');
          // var remoteVideoElement = this.$('#remote-video').get(0);
          remoteVideoElement.src = '';
          if (pc) {
            pc.close();
            pc = null;
          }
          if (ws) {
            ws.close();
            ws = null;
          }
          document.documentElement.style.cursor = 'default';
        }

        start();

        window.onbeforeunload = function () {
          if (ws) {
            ws.onclose = function () {}; // disable onclose handler first
            stop();
          }
        };
      },
    });
