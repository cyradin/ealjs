var xml2js = require('xml2js').parseString;
var hub  = require('./hub.js');

var parser = function(data, scope, callback) {
    var arr = [
        function(cb) {
            cb(null, data, scope);
        },
        XMLtoObj,
        errorCheck,
        parse
    ];
    hub.async.waterfall(arr, function(err, result) {
        callback(err, result);
    });
};

var XMLtoObj = function(data, scope, callback) {
    xml2js(data.data, function(err, result) {
        if (! hub._.isNull(err)) {
            data.data = false;
        } else {
            data.data = result;
        }
        callback(err, data, scope);
    });
};

var errorCheck = function(data, scope, callback) {
    if (data.data.eveapi.error !== undefined) {
        var er = data.data.eveapi.error[0];
        var err = new Error("API Call Error: (" + er.$.code + ") " + er._);
        data.data = false;
    }
    callback(err, data, scope);
};

var parse = function(data, scope, callback) {
    var dat = data.data.eveapi;
    var res = dat.result[0]; 
    var result = {};
    var fields = hub.config[scope].defaultFields;
    hub._.each(fields, function(i) {
        if (hub._.isArray(dat[i])) {
            result[i] = dat[i][0];
        } else {
            result[i] = dat[i] || '';
        }
    });
    if (data.type !== 'apikeyinfo') {
        result = hub._.extend(parse.recursive(res), result);
    } else {
        result = hub._.extend(parse.recursive(res).key, result);
    }
    delete(data.data);
    data.data = result;
    callback(null, data, res);
};

parse.recursive = function(res, columns) {
    var result = {};
    hub._.each(res, function(val, i) {
        if (hub._.isArray(val)) {
            if (i === "rowset") {
                hub._.each(val, function(rs) {
                    result[rs.$.name] = [];
                    columns = rs.$.columns.split(',');
                    hub._.each(rs.row, function(v) {
                        result[rs.$.name].push(parse.recursive(v, columns)); 
                    });
                });
            } else {
                if (hub._.isObject(val[0])) {
                    result[i] = {};
                    if (val[0].$) {
                        var r = {};
                        hub._.each(val[0].$, function(v, j) {
                            r[j] = v;
                        });
                        delete val[0].$;
                    }
                    result[i] = parse.recursive(val[0]);
                    hub._.extend(result[i], r);
                } else {
                    result[i] = val[0];
                }               
            }
        } else {
            if (i === "$") {
                result = parse.recursive(val);
            } else {
                result[i] = val;
            }
        };
    });
    return result;
};

module.exports = parser;
