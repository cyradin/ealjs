var hub     = require('./hub.js');
var parser  = require('./parser.js');
var request = require('./request.js');
var api = function() {};

api.prototype.get = function(type, param, callback) {
    if (hub._.isUndefined(callback)) {
        callback = param;
        param = {};
    }
    if (this.hasAccess(type)) {
        var _this = this;
        var arr = [
            function(cb) {
                setParam(type, param, _this, function(err, param) {
                    cb(err, type, _this.scope, param);
                });
            },
            request,
            function(result, cb) {
                cb(null, result, _this.scope);
            },
            parser
        ];
        hub.async.waterfall(arr, function(err, data) {
            if (err) {
                callback(err, data);
            } else {
                if (data.type === 'apikeyinfo' && hub._.isUndefined(_this.accessMask)) {
                    _this.accessMask = data.data.accessMask;
                }
                if (hub._.isFunction(callback)) {
                    callback(err, data);
                } else {
                    _this[type] = data.data;
                }
            }
        });
    } else {
        var err = new Error("API key has no access to that function");
        callback(err, null);
    }
};

api.prototype.access = function(mask, names) {
    mask = mask || this.accessMask;
    names = names || false;
    var a = [];
    var masks = hub.config.masks;
    hub._.each(masks, function(val, i) {
       if (mask >= val) {
           a.push(val);
           mask -= val;
       }
    });
    if (names) {
        var res = [];
        var ind = ['Account'];
        switch (this.scope) {
            case "Char":
                ind.push("Char");
                break;
            case "Corp":
                ind.push("Corp");
                break;
        }
        hub._.each(ind, function(val) {
           hub._.each(hub.config[val].API, function(v, i) {
               if (v.accessMask !== undefined && hub._.indexOf(a, v.accessMask) !== -1) {
                   res.push(i);
               };
           }); 
        });
        a = res;
    }
    return a;
};

api.prototype.hasAccess = function(type, mask) {
    var has = true;
    if (this.scope !== "server" && type !== "apikeyinfo") {
        var num = hub.config[this.scope].API[type].accessMask;
        if (mask) {
            this.setAccessList(mask);
            if (hub._.indexOf(this.accessList, num) === -1)
                has = false;
        } else {
            if (this.accessMask) {
                if (! this.accessList) {
                    this.setAccessList();
                }
                if (hub._.indexOf(this.accessList, num) === -1)
                    has = false;
            }
        }
    }
    return has;
};

api.prototype.setAccessList = function(mask) {
    mask = mask || this.accessMask;
    this.accessList = this.access(mask); 
};

var setParam = function(type, param, obj, callback) {
    var err = null;
    var temp = hub.config[obj.scope];
    if (temp.API[type] === undefined) {
        err = new Error('this type of API doesn\'t exist');
    } else {
        var required = temp.param;
        hub._.each(temp.API[type].param, function(val) {
            required.push(val);
        });
        hub._.each(required, function(val) {
           if (hub._.isUndefined(param[val])) {
               if (hub._.isUndefined(obj[val])) {
                   err = new Error('required parameter "' + val + '" not set');
               } else {
                   param[val] = obj[val];
               }
           }
        });
    }
    callback(err, param);
};

var char = function(keyid, vcode, characterid, accessMask) {
    this.accessMask = accessMask || null;
    if (this.accessMask) {
        this.setAccessList();
    };
    this.scope = 'Char';
    this.keyid = keyid;
    this.vcode = vcode;
    this.characterid = characterid;
};

char.prototype = api.prototype;

var key = function(keyid, vcode) {
    this.scope = 'Account';
    this.keyid = keyid;
    this.vcode = vcode;
};

key.prototype = api.prototype;


var server = function() {
    this.scope = 'Eve';
};

server.prototype = api.prototype;

exports.char = char;
exports.key = key;
exports.server = server;