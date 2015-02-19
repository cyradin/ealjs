var hub     = require('./lib/hub.js');
hub.config  = require('./config/config.js');
hub._       = require('underscore');
hub.async   = require('async');
var api     = require('./lib/api.js');

var _ealjs = function() {};

_ealjs.prototype.key = function(keyID, vCode) {
    return new api.key(keyID, vCode);
};

_ealjs.prototype.char = function(keyID, vCode, characterID, accessMask) {
    return new api.char(keyID, vCode, characterID, accessMask);
};

_ealjs.prototype.server = function() {
    return new api.server();
};

var ealjs = new _ealjs;

module.exports = ealjs;
