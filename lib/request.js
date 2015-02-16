var hub = require('../lib/hub.js');
var request = require('request');

var req = function (type, scope, paramObj, callback) {
    hub.async.waterfall([
        function (cb) {
            cb(null, type, scope, paramObj);
        },
        getURL,
        request
    ], function (err, response, body) {
        var result = {
            type: type,
            data: null
        };
        if (!err) {
            if (hub._.indexOf([200, 400, 403], response.statusCode) !== -1) {
                result.data = body;
            }
            else
                err = new Error("HTTP Error " + response.statusCode);
        }
        result.param = paramObj;
        callback(err, result);
    }
    );
};

var getURL = function (type, scope, paramObj, callback) {
    var arr = [
        function (cb) {
            cb(null, type, scope, paramObj);
        },
        checkUrl,
        setParamString,
        setOptionalParamString
    ];
    hub.async.waterfall(arr, function (err, conf, param) {
        if (!err) {
            var url = hub.config.core.url + conf['url'] + hub.config.core.ext + param;
        }
        callback(err, url);
    });
};


var checkUrl = function (type, scope, paramObj, cb) {
    var conf = hub._.clone(hub.config[scope].API[type]);
    var err = null;
    if (!hub._.has(conf, 'url')) {
        err = new Error('no URL for ' + type + ' in config file');
    }
    cb(err, scope, paramObj, conf);
};

var setParamString = function (scope, paramObj, conf, cb) {
    if (!hub._.has(conf, 'param')) {
        conf.param = hub.config[scope].param;
    } else {
        conf.param = hub._.extend(conf.param, hub.config[scope].param);
    }
    var paramStr = "";
    var err = null;
    hub._.each(conf.param, function (val) {
        paramStr = mergeParam(paramStr, val, paramObj);
    });
    cb(err, paramObj, paramStr, conf);
};

var setOptionalParamString = function (paramObj, paramStr, conf, cb) {
    if (hub._.has(conf, "optionalParam")) {
        hub._.each(conf.optionalParam, function (val) {
            if (!hub._.isEmpty(paramObj[val])) {
                paramStr = mergeParam(paramStr, val, paramObj);
            }
        });
    }
    cb(null, conf, paramStr);
};

var mergeParam = function(param, val, paramObj) {
    var t = paramObj[val];
    if (hub._.isArray(t)) {
        t = t.join(',');
    };
    param = param + "&" + val + "=" + t;
    return param;
};


module.exports = req;
