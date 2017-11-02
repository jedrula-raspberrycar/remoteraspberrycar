import Ember from 'ember';
import config from 'ember-remoteraspberrycar/config/environment';
const { APP: { API_WS_HOST, API_HOST } } = config;
const { Component } = Ember;


export default Component.extend({
  didInsertElement() {
    this.set('counter', 0);
    const socket = new WebSocket(API_WS_HOST);
    socket.onmessage = (event) => {
      // this.set(event.data, Date.now());
      console.log(event);
      const counter = this.get('counter');
      console.timeEnd(`send-${counter}`);
      // const json = JSON.parse(event.data);
      // const { handler, data } = json;
      // this.handlers[handler](data);
    }
    this.set('socketRef', socket);
  },
  wow: 'xxx2',
  actions: {
    send() {
      const socket = this.get('socketRef');
      if (socket.readyState !== socket.OPEN) {
        alert(`socket state is ${socket.readyState}`);
      } else {
        this.incrementProperty('counter');
        const counter = this.get('counter');
        console.time(`send-${counter}`);
        socket.send('hello');
      }
    },
    fetchtest() {
      console.time('fetchtest');
      fetch(API_HOST + '/fetchtest').then(response => response.json()).then(json => console.timeEnd('fetchtest'));
    }
  }
});
