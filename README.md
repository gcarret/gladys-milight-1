# Gladys Milight V6
## Installation
### Step: 1
Install the module in Gladys
advanced mode : Milight  1.0.0   https://github.com/AdrienDesola/gladys-milight.git  milight
Reboot Gladys

### Step: 2
Go on the dashboard on "Module" view, then in the module list press the "config" button on the Milight module.

### Step: 3
**there is no step 3**
All off your devices are already configured.

**Go on the dashboard on « Devices » view and start use it.**

## Hack n Scripts
Gladys Milight V6 are easy to use on " Scripts " view.
you can use all of Milight methods.

```
const bridge = gladys.modules['milight'].getBridge( <bridgeId> );

bridge.on(zone);
bridge.off(zone);
bridge.whiteMode(zone);
bridge.whiteTemperature(zone, 100); // 0 to 100;
bridge.nightMode(zone);
bridge.brightness(zone, 100); // 0 to 100
bridge.saturation(zone, 100); 0 to 100
bridge.hue(zone, 255); 0 to 255
bridge.rgb(zone, 255, 255, 255);
bridge.effectMode(zone, 9); 1 to 9
bridge.effectModeNext(zone);
bridge.effectSpeedUp(zone);
bridge.effectSpeedDown(zone);
```


### To Do
- [ ] Sunrise method.
