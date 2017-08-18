let id = 1;

const gladys = {
  on() {},
  device: {
    create(device) {
      return Object.assign({ id: id++ }, device.device);
    }
  }
}

const milight = require('./index.js')();
milight.setup();
