import Ember from 'ember';
const { Component, computed } = Ember;

function areAll(status) {
  return computed.and(`wheelone.isStatus${status}`, `wheeltwo.isStatus${status}`);
}

export default Component.extend({
  wheelone: computed.alias('model.wheelone'),
  wheeltwo: computed.alias('model.wheeltwo'),

  areAllBack:    areAll('Back'),
  areAllStopped: areAll('Stopped'),
  areAllForward: areAll('Forward'),

  actions: {
    changeStatus(wheel, newStatus) {
      return wheel.saveStatus(newStatus);
    },
    changeAll(newStatus) {
      this.get('wheelone').saveStatus(newStatus);
      this.get('wheeltwo').saveStatus(newStatus);
    },
  }
});
