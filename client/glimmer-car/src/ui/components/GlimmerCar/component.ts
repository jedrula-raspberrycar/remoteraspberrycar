import Component, { tracked } from '@glimmer/component';

/**
 * [middleRange the value between min and max of the rage input]
 * @type {Number}
 */
const middleRange = 50;


/**
 * gets a value from 0 to 1 proportional to the dutyCycles on a pin
 * @param  {number} speed value from 0 to 100 that can mean turning left or right. Value 0 is full left, value 50 is stop, value 100 is full right
 * @return {number}       value from 0 to 1 proportional to the dutyCycles on the pin. The negative/positive sign indicates which pin to set
 */
function getPulseModulation(speed: number) : number {
  return Math.abs((speed - middleRange) / middleRange);
}


// converts speed value to 2 pwm values driving the wheel
function wheelSpeedToPulseModulations(speed): [number, number] {
  const modulation = getPulseModulation(speed)
    if (speed > middleRange) {
      return [0, modulation];
    } else {
      return [modulation, 0];
    }
}

export default class GlimmerCar extends Component {
  sendingRequest = false;

  @tracked car = {
    left: 50,
    right: 50
  };

  @tracked('car')
  get pulseModulations() {
    const pulseModulations = [
      ...wheelSpeedToPulseModulations(this.car.left),
      ...wheelSpeedToPulseModulations(this.car.right),
    ];
    return pulseModulations;
  }

  changeSpeed(wheelId: string, speed) {
    speed = parseInt(speed, 10);

    this.car = {
      ...this.car,
      [wheelId]: speed
    }

    if (!this.sendingRequest) {
      this.sendCarPatch(...this.pulseModulations);
    }
  }

  async sendCarPatch(...pulseModulations) {
    this.sendingRequest = true;
    const body = JSON.stringify({ pulseModulations });
    // // const endpoint = `http://raspberrypi.local:3001/wheels/${id}`;
    // const endpoint = 'http://localhost:8432/car';
    // const endpoint = `http://raspberrypi.local:80/car`;
    const endpoint = `http://jedrula.ddns.net:7002/car`;
    const response = await fetch(endpoint, {
      method: 'PATCH',
      body,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    });
    const data = await response.json();
    this.sendingRequest = false;
    if (JSON.stringify(pulseModulations) !== JSON.stringify(this.pulseModulations)) {
      this.sendCarPatch(...this.pulseModulations);
    }
  }
}


