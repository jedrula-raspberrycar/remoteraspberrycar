import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  actions: {
    changeSpeed(wheel, newSpeed) {
      return wheel.saveSpeed(newSpeed);
    },
  }
});
