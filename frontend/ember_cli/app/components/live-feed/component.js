import Ember from 'ember';
import config from 'ember-remoteraspberrycar/config/environment';

const { APP: { API_WS_HOST } } = config;

export default Ember.Component.extend({
  didRender() {
    const canvas = this.$('canvas').get(0);
    const wsavc = new WSAvcPlayer(canvas, "webgl"); // , 1, 35
    wsavc.connect(API_WS_HOST);
  }
});
