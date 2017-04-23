import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
      setTimeout(() => {
        const canvas = this.$('canvas').get(0);
        var uri = "ws://78.88.254.231:5000";
        var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);
        wsavc.connect(uri);
        setTimeout(function() {
          wsavc.playStream()
        }, 2000)
    }, 2000)
  }
});
