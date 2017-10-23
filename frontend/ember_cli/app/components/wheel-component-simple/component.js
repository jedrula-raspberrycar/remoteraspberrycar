import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateSpeed(wheel, speed) {
      Ember.run.debounce(wheel, "saveSpeed", [speed], 25);
      // wheel.saveSpeed(speed);
    }
  }
});
