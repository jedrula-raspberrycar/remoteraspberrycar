import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('forwardKeyState', 'keyup');
    this.set('backKeyState', 'keyup');
    Ember.$(document).on('keyup keydown', null, (event) => {
      const prevspeed = this.get('speed');  //TODO move to adapter ?
      console.log(prevspeed);
      if(event.keyCode === this.get('forwardKey')) {
        this.set('forwardKeyState', event.type);
      }
      else if(event.keyCode === this.get('backKey')) {
        this.set('backKeyState', event.type);
      }
      const curspeed = this.get('speed');
      if(prevspeed !== curspeed) {
        this.get('changeSpeed')(curspeed);
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
    
    const prevspeed = this.get('speed');
    const position = this.getTouchPosition(pageY);
    if(position == 'top') {
      this.set('forwardKeyState', 'keydown');
    } else if(position == 'bottom') {
      this.set('backKeyState', 'keydown');
    } else if(position === 'middle') {
      this.set('forwardKeyState', 'keyup');
      this.set('backKeyState', 'keyup');
    }

    const curspeed = this.get('speed');
    if(prevspeed !== curspeed) {
      console.log('changing speed to ', curspeed)
      this.get('changeSpeed')(curspeed);
    }
  },
  touchEnd() {
    this.set('forwardKeyState', 'keyup');
    this.set('backKeyState', 'keyup');
    const curspeed = this.get('speed');
    this.get('changeSpeed')(curspeed);
  },
  speed: Ember.computed('forwardKeyState','backKeyState', function() {
    const forwardKeyState = this.get('forwardKeyState');
    const backKeyState = this.get('backKeyState');

    const bothUp = this.isUp(forwardKeyState) && this.isUp(backKeyState);
    const bothDown = this.isDown(forwardKeyState) && this.isDown(backKeyState);

    if(bothUp || bothDown) {
      return 0;
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

