var Milight = require('node-milight-promise').MilightController;
var Commands = require('node-milight-promise').commandsV6;

var discoverBridges = require('node-milight-promise').discoverBridges;

discoverBridges({
  type: 'all'
}).then(bridges => bridges
    .map(bridge => new Milight({
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
  bridges.map(light => {
    for (var zone = 1; zone < 5; zone++) {
      var color = 100;
      light.blink(zone, color);
    }
    light.close().then(function () {
      console.log("All command have been executed - closing Milight");
    });
  })
})
