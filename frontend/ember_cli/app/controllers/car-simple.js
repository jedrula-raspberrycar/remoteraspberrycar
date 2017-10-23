import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    updateSpeed(wheel, speed) {
      wheel.saveSpeed(speed);
    }
  }
})
