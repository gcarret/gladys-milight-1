let id = 1;

gladys = {
  on() {},
  device: {
    create(device) {
      return Object.assign({ id: id++ }, device.device);
    }
  }
}

const milight = require('./index.js')();
milight.setup();
