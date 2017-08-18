var milight = require('node-milight-promise');
var Promise = require('bluebird');
var init = require('./milight.init.js');

module.exports = function() {


  discoverBridges({
    type: 'all'
  }).then(bridges =>
    bridges.map(bridge => gladys.device.create({
      device: {
        name: 'Milight bridge',
        protocol: 'wifi',
        service: 'milight',
        identifier: bridge.ip,
        type: bridge.type
      },
      types: []
    })
  ).then(devices => {
    devices.forEach((device, index) =>
    [1, 2, 3, 4].map(zone =>
      gladys.device.create({
        device: {
          name: `bridge ${device.id} > zone ${zone}`,
          protocol: 'milight',
          service: 'milight',
          identifier: bridge.ip,
          type: bridge.type
        },
        types: [
          {
            type: 'binary',
            min: 0,
            max: 1
        },
        {
            type:'hue',
            unit: 'color',
            min: 0,
            max: 255
        },
        {
            type:'brightness',
            unit: 'brightness',
            min: 0,
            max: 100
        }
        ]
      })))
      return devices
    })
    .then(devices =>
      bridges.map(bridge => new Milight({
        ip: bridge.ip,
        name: bridge.name,
        type: bridge.type,
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
        }
      })
    )
  ).then(bridges => {
    bridges.map(light =>
      [1, 2, 3, 4].map( zone => light.blink(zone, 100)))
      light.close().then(function () {
        console.log("All command have been executed - closing Milight");
      });
    })
  })
