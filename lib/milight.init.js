var shared = require('./milight.shared.js');
var Milight = require('node-milight-promise').MilightController;

module.exports = function init() {
    return gladys.device.getByService({service: 'milight'})
      .then((devices) => {

          // reset the bridge array
          shared.bridges = [];

          // foreach device, if the device
          // is a bridge we add the IP of the bridge to the array
          devices
          .filter( ({ protocol }) => protocol === 'wifi')
          .forEach( (bridge) => shared.bridges[bridge.id] = new Milight(bridge) );
      });
};
