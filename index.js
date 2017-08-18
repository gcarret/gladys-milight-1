module.exports = function (sails) {

    var discoverBridges = require('node-milight-promise').discoverBridges;
    var exec = require('./lib/milight.exec.js');
    var setup = require('./lib/milight.setup.js');
    var init = require('./lib/milight.init.js');

    gladys.on('ready', function(){
        setup();
    });

    return {
        exec,
        setup,
        init,
        discoverBridges
    };
};
