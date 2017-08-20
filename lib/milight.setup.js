var { discoverBridges } = require('node-milight-promise');

var Promise = require('bluebird');
var init = require('./milight.init.js');

Promise.reject = console.error

module.exports = function() {

  return discoverBridges({
    type: 'all'
  })
  .then( bridges =>
    Promise.map(bridges, bridge => gladys.device.create({
      device: {
        name: 'Milight bridge',
        protocol: 'wifi',
        service: 'milight',
        identifier: bridge.ip,
        type: bridge.type
      },
      types: []
    }))
  )
  .then(devices => {
    return Promise.map(devices, ({device}) => {
      return [1, 2, 3, 4].map(zone =>
        gladys.device.create({
          device: {
            name: `bridge ${device.id} > zone ${zone}`,
            protocol: 'milight',
            service: 'milight',
            identifier: `${device.id}:${zone}`,
            type: device.type
          },
          types: [
            {
              type: 'binary',
              sensor: false,
              min: 0,
              max: 1
            },
            {
              type: 'hue',
              sensor: false,
              min: 0,
              max: 255
            },
            {
              type: 'brightness',
              sensor: false,
              min: 0,
              max: 100
            }
          ]
        }))
      })
    })
    .then(init)
    .catch(console.error);
}
