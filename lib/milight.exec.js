var shared = require('./milight.shared.js');
var Milight = require('node-milight-promise').MilightController;
var Commands = require('node-milight-promise').commandsV6;

module.exports = function(params) {
    var arr = params.deviceType.identifier.split(':');
    var bridgeId = arr[0];
    var zone = arr[1];

    if(!shared.bridges[bridgeId])
        return Promise.reject(new Error(`Bridge id n°${bridgeId} not found`));

    var light = shared.bridges[bridgeId];

    switch(params.deviceType.type){
        case 'binary':
            if(params.state.value === 1){
                light.sendCommands(commands.rgbw.on(zone));
            } else {
                light.sendCommands(commands.rgbw.off(zone));
            }
        break;

        case 'brightness':
            light.sendCommands(commands.rgbw.on(zone));
            light.sendCommands(commands.rgbw.brightness(params.state.value));
        break;

        case 'hue':
            light.sendCommands(commands.rgbw.on(zone));
            light.sendCommands(commands.rgbw.hue(params.state.value));
        break;
    }

    light.pause(1000);

    return light.close();
};
