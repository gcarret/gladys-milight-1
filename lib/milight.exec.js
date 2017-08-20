var shared = require('./milight.shared.js');

module.exports = function(params) {
  var arr = params.deviceType.identifier.split(':');
  var bridgeId = arr[0];
  var zone = arr[1];

  if(!shared.bridges[bridgeId])
  return Promise.reject(new Error(`Bridge id n°${bridgeId} not found`));

  var light = shared.bridges[bridgeId];

  switch(params.deviceType.type){
    case 'binary':
      light.toggle(zone, params.state.value)
    break;
    case 'whiteMode':
      light.whiteMode(zone, params.state.value)
    break;
    case 'whiteTemperature':
      light.whiteTemperature(zone, params.state.value)
    break;
    case 'nightMode':
      light.nightMode(zone, params.state.value)
    break;
    case 'brightness':
      light.brightness(zone, params.state.value)
    break;
    case 'saturation':
      light.saturation(zone, params.state.value)
    break;
    case 'hue':
      light.hue(zone, params.state.value)
    break;
    case 'effectMode':
      light.effectMode(zone, params.state.value)
    break;
  }

  light.pause(1000);
};
