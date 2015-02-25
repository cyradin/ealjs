var hub     = require('./hub.js');
var parser  = require('./parser.js');
var request = require('./request.js');
var api = function() {};

api.prototype.get = function(type, param, callback) {
    if (hub._.isUndefined(callback)) {
        callback = param;
        param = {};
    }
    var err = this._existCheck(type) || this._hasAccess(type);
    if (! err) {
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
    if (this.scope !== "Server" && type !== "apikeyinfo") {
        var num = hub.config[this.scope].API[type].accessMask;
        if (mask) {
            this._setAccessList(mask);
            if (hub._.indexOf(this.accessList, num) === -1)
                has = false;
        } else {
            if (this.accessMask) {
                if (! this.accessList) {
                    this._setAccessList();
                }
                if (hub._.indexOf(this.accessList, num) === -1)
                    has = false;
            }
        }
    }
    return has;
};

api.prototype._setAccessList = function(mask) {
    mask = mask || this.accessMask;
    this.accessList = this.access(mask); 
};

api.prototype._existCheck = function(type) {
    var err = null;
    if (hub.config[this.scope].API[type] === undefined) {
        err = new Error('this type of API doesn\'t exist in this scope');
    };
    return err;
};

api.prototype._hasAccess = function(type) {
    var err = null;
    if (! this.hasAccess(type)) {
        err = new Error("API key has no access to that function");
    };
    return err;
};

var setParam = function(type, param, obj, callback) {
    var err = null;
    var temp = hub.config[obj.scope];
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
    callback(err, param);
};

var char = function(keyid, vcode, characterid, accessMask) {
    this.accessMask = accessMask || null;
    if (this.accessMask) {
        this._setAccessList();
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

var corp = function(keyid, vcode, accessMask) {
    this.accessMask = accessMask || null;
    if (this.accessMask) {
        this._setAccessList();
    };
    this.scope = 'Corp';
    this.keyid = keyid;
    this.vcode = vcode;
};

corp.prototype = api.prototype;

var server = function() {
    this.scope = 'Server';
};

server.prototype = api.prototype;

exports.char = char;
exports.key = key;
exports.server = server;
exports.corp = corp;