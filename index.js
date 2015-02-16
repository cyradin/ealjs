var hub     = require('./lib/hub.js');
hub.config  = require('./config/config.js');
hub._       = require('underscore');
hub.async   = require('async');
var api     = require('./lib/api.js');

var _neal = function() {};

_neal.prototype.key = function(keyID, vCode) {
    return new api.key(keyID, vCode);
};

_neal.prototype.char = function(keyID, vCode, characterID, accessMask) {
    return new api.char(keyID, vCode, characterID, accessMask);
};

_neal.prototype.server = function() {
    return new api.server();
};

var neal = new _neal;

module.exports = neal;
