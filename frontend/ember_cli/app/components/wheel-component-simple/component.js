import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateSpeed(wheel, speed) {
      wheel.saveSpeed(speed);
    }
  }
});
