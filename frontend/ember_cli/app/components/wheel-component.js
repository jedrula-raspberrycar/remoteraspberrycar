import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('forwardKeyState', 'keyup');
    this.set('backKeyState', 'keyup');
    Ember.$(document).on('keyup keydown', null, (event) => {
      const prevStatus = this.get('status');  //TODO move to adapter ?
      if(event.keyCode === this.get('forwardKey')) {
        this.set('forwardKeyState', event.type);
      }
      else if(event.keyCode === this.get('backKey')) {
        this.set('backKeyState', event.type);
      }
      const curStatus = this.get('status');
      if(prevStatus !== curStatus) {
        this.get('changeStatus')(curStatus);
      }
    });
  },
  didInsertElement() {
    const currentTarget = this.$();
    this.setProperties({
      offsetTop: currentTarget.offset().top,
      height: currentTarget.height(),
    });
  },
  getTouchPosition(pageY) {
    const val = -1 * (((pageY - this.get('offsetTop')) / this.get('height')) - 1/2);
    if(val < -0.17) {
      return 'bottom';
    } else if(val < 0.17) {
      return 'middle';
    } else {
      return 'top';
    }
  },
  touchMove(obj) {
    obj.preventDefault();
    const { pageY } = obj.originalEvent.targetTouches[0];
    
    const prevStatus = this.get('status');
    const position = this.getTouchPosition(pageY);
    if(position == 'top') {
      this.set('forwardKeyState', 'keydown');
    } else if(position == 'bottom') {
      this.set('backKeyState', 'keydown');
    } else if(position === 'middle') {
      this.set('forwardKeyState', 'keyup');
      this.set('backKeyState', 'keyup');
    }

    const curStatus = this.get('status');
    if(prevStatus !== curStatus) {
      console.log('changing status to ', curStatus)
      this.get('changeStatus')(curStatus);
    }
  },
  touchEnd() {
    this.set('forwardKeyState', 'keyup');
    this.set('backKeyState', 'keyup');
    const curStatus = this.get('status');
    this.get('changeStatus')(curStatus);
  },
  status: Ember.computed('forwardKeyState','backKeyState', function() {
    const forwardKeyState = this.get('forwardKeyState');
    const backKeyState = this.get('backKeyState');

    const bothUp = this.isUp(forwardKeyState) && this.isUp(backKeyState);
    const bothDown = this.isDown(forwardKeyState) && this.isDown(backKeyState);

    if(bothUp || bothDown) {
      return 'stopped';
    } else if(this.isDown(backKeyState)) {
      return "back";
    } else {
      return "forward";
    }
  }),
  isUp(state) {
    return state === 'keyup';
  },
  isDown(state) {
    return state === 'keydown';
  }
});

