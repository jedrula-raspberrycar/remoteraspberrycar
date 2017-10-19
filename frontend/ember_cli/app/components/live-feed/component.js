import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    // setTimeout(() => {
      const canvas = this.$('canvas').get(0);
      const uri = "ws://192.168.1.102:80/video-stream";
      // const uri = "wss://4de93a31a4324b5dfa4e5e7881681c56.resindevice.io/video-stream";
      const wsavc = new WSAvcPlayer(canvas, "webgl"); // , 1, 35
      wsavc.connect(uri);
      // setTimeout(function() {
      //   wsavc.playStream()
      // }, 2000)
    // }, 2000)
  }
});
