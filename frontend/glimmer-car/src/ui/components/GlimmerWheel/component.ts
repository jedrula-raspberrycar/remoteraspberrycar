import Component from '@glimmer/component';

export default class GlimmerWheel extends Component {
  inputEvent({ target: { value } }) {
    // console.log('value', value)
    this.args.changeSpeed(value);
  }
}

