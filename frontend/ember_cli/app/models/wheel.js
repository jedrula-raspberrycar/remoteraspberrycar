import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export default Model.extend({
  status: attr('string'),
  saveStatus(newStatus) {
    this.set('status', newStatus);
    return this.save();
  },
  isStatusForward: computed.equal('status', 'forward'),
  isStatusStopped: computed.equal('status', 'stopped'),
  isStatusBack: computed.equal('status', 'back'),
});
