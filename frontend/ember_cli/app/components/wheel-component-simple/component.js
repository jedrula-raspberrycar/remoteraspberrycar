import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateSpeed(speed) {
      this.get('changeSpeed')(speed);
    }
  }
});
