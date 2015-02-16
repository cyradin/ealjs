var xml2js = require('xml2js').parseString;
var hub  = require('./hub.js');

var parser = function(data, scope, callback) {
    var arr = [
        function(cb) {
            cb(null, data, scope);
        },
        XMLtoObj,
        errorCheck,
        parse.index,
        parse.rowset
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

var parse = {};

parse.index = function(data, scope, callback) {
    var dat = data.data.eveapi;
    var res = dat.result[0];
    if (parse.index[data.type] !== undefined) {
        data.data = parse.index[data.type](dat, res);
    } else {
        data.data = parse.index.default(dat, res, scope);
    }
    callback(null, data, res);
};

parse.rowset = function(data, res, callback) {
    if (data.type === "apikeyinfo") {
        res = res.key[0];
    }
    var rs = res.rowset;
    if (rs !== undefined) {
        var max = rs.length;
        for (var i = 0; i < max; i++) {
            if (parse.rowset[rs[i].$.name] !== undefined) {
                data.data[rs[i].$.name] = parse.rowset[rs[i].$.name](rs[i]);
            } else {
                data.data[rs[i].$.name] = parse.rowset.default(rs[i]);
            }
        }
    }
    callback(null, data);
};

parse.index.default = function(dat, res, scope) {
    var result = {};
    var fields = hub.config[scope].defaultFields;
    hub._.each(fields, function(i) {
        if (hub._.isArray(dat[i])) {
            result[i] = dat[i][0];
        } else {
            result[i] = dat[i] || '';
        }
    });
    hub._.each(res, function(val, key) {
        if (key !== 'rowset') {
           result[key] = val[0];
        };
    });
    return result;
};

parse.index.apikeyinfo = function(data, res) {
    res = res.key[0];
    var result = {
        type: res.$.type,
        accessMask: res.$.accessMask,
        expires: res.$.expires || 'never',
        cachedUntil: data.cachedUntil[0]
    };
    return result;
};

parse.rowset.default = function(rs) {
    var result = [];
    if (rs.row !== undefined) {
        var columns = rs.$.columns.split(',');
        rs.row.forEach(function(v, j) {
            var row = {};
            if (v.rowset !== undefined) {
                v.rowset.forEach(function(rs_inner, k) {
                    row[rs_inner.$.name] = parse.rowset.default(rs_inner);
                });
            }
            for (var k = 0; k < columns.length; k++) {
                row[columns[k]] = v.$[columns[k]];
            }
            result.push(row); 
        });
    }
    return result;
};

module.exports = parser;
