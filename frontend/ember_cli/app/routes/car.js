import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
        wheelone: this.store.findRecord('wheel','one'),
        wheeltwo: this.store.findRecord('wheel','two')
    });
  }
});
