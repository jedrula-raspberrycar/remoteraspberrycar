import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export default Model.extend({
  saveSpeed(newSpeed) {
    this.set('speed', newSpeed);
    return this.save();
  },
  speed: attr('number'),
  isMovingForward: computed.gt('speed', 0),
  isWheelStopped: computed.equal('speed', 0),
  isMovingBack: computed.lt('speed', 0),
});
