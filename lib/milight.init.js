var shared = require('./milight.shared.js');
var Milight = require('node-milight-promise').MilightController;
var Promise = require('bluebird');

module.exports = function init() {
  return gladys.device.getByService({service: 'milight'})
  .then((devices) => {
    // reset the bridge array
    shared.bridges = [];

    // foreach device, if the device
    // is a bridge we add the IP of the bridge to the array
    devices
    .filter( ({ protocol }) => protocol === 'wifi')
    .map(bridge => shared.bridges[bridge.id] = new Milight({
      {
        ip: bridge.identifier.split(':')[0],
        type: bridge.identifier.split(':')[1]
      }
    }));
  }).catch(console.error);
};
