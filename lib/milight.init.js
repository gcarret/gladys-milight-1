var shared = require('./milight.shared.js');
var MilightController = require('node-milight-promise').MilightController;
var Promise = require('bluebird');

var commandsV6 = require('node-milight-promise').commandsV6.fullColor;
var commands2 = require('node-milight-promise').commands2.rgbw;


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
      ip: bridge.identifier.split(':')[0],
      type: bridge.identifier.split(':')[1]
    }));
  }).catch(console.error);
};

Milight extends MilightController {
  constructor(options) {
    super(options)
    rgbw
    bridge
    fullColor
    this.type === 'v6' commandsV6 : commands2
  }
  toggle(zone, value) {
    value ? this.on(zone) : this.off(zone)
  }
  on(zone) {
    this.sendCommands(this.commands.on(zone))
  }
  off(zone) {
    this.sendCommands(this.commands.off(zone))
  }
  whiteMode(zone, value) {
    value = typeof value !== 'undefined' ? value : 1;
    value && this.sendCommands(this.commands.whiteMode(zone))
  }
  whiteTemperature(zone, temperature) {
    this.sendCommands(this.commands.whiteTemperature(zone, temperature))
  }
  nightMode(zone, value) {
    value = typeof value !== 'undefined' ? value : 1;
    value && this.sendCommands(this.commands.nightMode(zone))
  }
  brightness(zone, percent) {
    if(!zone || zone === 'bridge') zone = percent;
    this.sendCommands(this.commands.brightness(zone, percent))
  }
  saturation(zone, saturationValue, invertValue = 1) {
    this.sendCommands(this.commands.saturation(zone, saturationValue, invertValue))
  }
  hue(zone, hue, enableLegacyColorWheel = 0) {
    if(!zone || zone === 'bridge') zone = hue;
    this.sendCommands(this.commands.hue(zone, hue, enableLegacyColorWheel))
  }
  rgb(zone, r, g, b) {
    if(!zone || zone === 'bridge') { zone = r; r = g; g = b; }
    this.sendCommands(this.commands.rgb(zone, r, g, b))
  }
  effectMode(zone, mode) {
    this.sendCommands(this.commands.effectMode(zone, [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09][mode - 1]))
  }
  effectModeNext(zone) {
    this.sendCommands(this.commands.effectModeNext(zone))
  }
  effectSpeedUp(zone) {
    this.sendCommands(this.commands.effectSpeedUp(zone))
  }
  effectSpeedDown(zone) {
    this.sendCommands(this.commands.effectSpeedDown(zone))
  }
}
