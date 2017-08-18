var Milight = require('node-milight-promise').MilightController;
var discoverBridges = require('node-milight-promise').discoverBridges;
var Commands = require('node-milight-promise').commandsV6;

var Promise = require('bluebird');
var init = require('./milight.init.js');

module.exports = function() {
  console.log('Gladys Milight SETUP')
  discoverBridges({
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
    Promise.map(device =>
    [1, 2, 3, 4].map(zone =>
      gladys.device.create({
        device: {
          name: `bridge ${device.id} > zone ${zone}`,
          protocol: 'milight',
          service: 'milight',
          identifier: device.ip,
          type: device.type
        },
        types: [] || [
          {
            deviceType: {
            id: (device.id * 10) + 1,
            identifier: `${ (device.id * 10) + 1 }_binary`,
            type: 'binary',
            name: `${ (device.id * 10) + 1 } binary`,
            min: 0,
            max: 1
          },
          state: {
            value: 0
          }
        },
          {
            deviceType: {
            id: (device.id * 10) + 2,
            identifier: `${ (device.id * 10) + 2 }_hue`,
            type: 'hue',
            name: `${ (device.id * 10) + 2 } hue`,
            min: 0,
            max: 255
          },
          state: {
            value: 0
          }
        },
          {
            deviceType: {
            id: (device.id * 10) + 3,
            identifier: `${ (device.id * 10) + 3 }_brightness`,
            type: 'brightness',
            name: `${ (device.id * 10) + 3 } brightness`,
            min: 0,
            max: 100
          },
          state: {
            value: 0
          }
        }
        ]
      })))
      return devices
    })
    .then(devices =>
      Promise.map(devices, devices => new Milight({
        ip: devices.identifier,
        name: devices.name,
        type: devices.type,
        blink(zone, color) {

          this.sendCommands(Commands.rgbw.on(zone));
          this.sendCommands(Commands.rgbw.hue(zone, color));
          this.sendCommands(Commands.rgbw.brightness(zone, 10));

          this.pause(250);

          for (var i = 0; i < 3; i++) {
            this.sendCommands(Commands.rgbw.brightness(zone, 100));
            this.pause(500);
            this.sendCommands(Commands.rgbw.brightness(zone, 10));
            this.pause(500);
          }
          this.sendCommands(Commands.rgbw.whiteMode(zone));
        }
      })
    )
  ).then(bridges =>
    Promise.map(bridges, light => {
      [1, 2, 3, 4].map( zone => light.blink(zone, 100));
      light.pause(250);
      console.log('close')
      light.close().then(function () {
        console.log("All command have been executed - closing Milight");
      }).catch(console.error);
    })
  )
}
