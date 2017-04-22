import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
      setTimeout(() => {
        const canvas = this.$('canvas').get(0);
        var uri = "ws://192.168.0.155:8080";
        var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
        wsavc.connect(uri);
        //expose instance for button callbacks
        window.wsavc = wsavc;
        setTimeout(function() {
          wsavc.playStream()
        }, 2000)
    }, 2000)
  }
});
