import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    const canvas = this.$('canvas').get(0);
    const wsavc = new WSAvcPlayer(canvas, "webgl"); // , 1, 35
    const uri = "ws://jedrula.ddns.net:7002/video-stream";
    wsavc.connect(uri);
  }
});
