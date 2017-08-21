var { discoverBridges } = require('node-milight-promise');

var Promise = require('bluebird');
var init = require('./milight.init.js');

Promise.reject = console.error;

const types = (deviceId, zone) => [
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'binary',
    sensor: false,
    min: 0,
    max: 1
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'whiteMode',
    sensor: false,
    min: 0,
    max: 1
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'whiteTemperature',
    sensor: false,
    min: 0,
    max: 100
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'nightMode',
    sensor: false,
    min: 0,
    max: 1
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'brightness',
    sensor: false,
    min: 0,
    max: 100
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'saturation',
    sensor: false,
    min: 0,
    max: 100
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'hue',
    sensor: false,
    min: 0,
    max: 255
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'effectMode',
    sensor: false,
    min: 1,
    max: 9
  }
]
const bridgetypes = (deviceId, zone) => [
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'binary',
    sensor: false,
    min: 0,
    max: 1
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'whiteMode',
    sensor: false,
    min: 0,
    max: 1
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'nightMode',
    sensor: false,
    min: 0,
    max: 1
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'brightness',
    sensor: false,
    min: 0,
    max: 100
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'hue',
    sensor: false,
    min: 0,
    max: 255
  },
  {
    identifier: `${deviceId}:${zone}`,
    category: 'light',
    type: 'effectMode',
    sensor: false,
    min: 1,
    max: 9
  }
]
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
        identifier: `${bridge.ip}:${bridge.type}`
      },
      types: []
    }))
  )
  .then(devices => {
    return Promise.map(devices, ({device}) => {
      return [0,1, 2, 3, 4, 'bridge'].map(zone =>
        gladys.device.create({
          device: {
            name: `bridge ${device.id} > zone ${zone}`,
            protocol: 'milight',
            service: 'milight',
            identifier: `${device.id}:${zone}`,
            type: device.type
          },
          zone !='bridge' ? types: types(device.id, zone) : types: bridgetypes(device.id, zone)
        }))
      })
    })
    .then(init)
    .catch(console.error);
}
