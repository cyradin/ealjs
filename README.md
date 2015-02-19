# EAL.js

EAL.js is a Node.js library for EVE Online API.

## Requirements

Node.js v0.10+

## Installation

```bash
$ npm install ealjs
```

## Usage

### Quick Start

Get server status:

```javascript
var eveapi = require('ealjs');
var srv = eveapi.server();

srv.get('serverstatus', function(err, result) {
    if (! err)
        console.dir(result);
});
```

Get information about API key:

```javascript
var keyid = 1234567
var vcode = "qwertyuiop"
var apiKey = eveapi.key(keyID, vCode);

apiKey.get('apikeyinfo', function(err, result) {
    // ...
})
```
Get mail bodies by given ids:

```javascript
var char = eveapi.char(keyID, vCode, characterID);

char.get('mailbodies', {ids: [345676097, 332636164]},  function(err, result) {
    // ...
});
```

###Scopes

__Server__

Includes all API functions that don't need authentication by keyID and vCode,
such as `'serverstatus'`, public `'characterinfo'`, character id to name conversion.
```javascript
var srv = eveapi.server();
```
__Key__

Information about API key (`'apikeyinfo'` and `'accountstatus'`).
```javascript
var key = eveapi.key(keyid, vcode);
```
__Char__

Character functions (`'characterinfo'`, `'charactersheet'`, `'mailmessages'`, `'mailbodies'`)
```javascript
var char = eveapi.char(keyid, vcode, characterid[, accessmask]);
```
<b>Note</b>: if you don't set access mask, access check will be disabled.

__Corp__

Coming soon
### Methods:
* [`get`](#get)
* [`access`](#access)

<a name="get" />
#### 1. Get
```javascript
%%scope%%.get(apiType[, param], callback);
```
__Arguments__
* `apiType` - name of the API function (see [New Eden Development](https://neweden-dev.com/) or
config/config.js in the module folder).
<b>Note</b>: All of them must be written in lower case. (i.e. `'apikeyinfo'`, `'charactersheet'`).
* `param` - you can provide additional parameters (message IDs, row count etc.)
<b>Note</b>: Parameter names must be written in a lower case.
* `callback(err, result)` - 

<b>Note</b>: Each `<rowset>` field if received XML will be named as it's `"name"` attribute.

__Quick example__
```javascript
var param = {
    rowcount: 250
}

char.get('walletjournal', param, callback);
``` 
__Detailed example__
```javascript
var eveapi  = require('ealjs');
var apiKey = eveapi.key(keyid, vcode);
apiKey.get('apikeyinfo', callback);
```



Example XML of the response:
```xml
<eveapi version="2">
    <currentTime>2015-02-19 12:08:08</currentTime>
    <result>
        <key accessMask="268435455" type="Account" expires="">
            <rowset name="characters" key="characterID" columns="characterID,characterName,corporationID,corporationName,allianceID,allianceName,factionID,factionName">
                <row characterID="94681458" characterName="Gallente Citizen 013241" corporationID="1001176" corporationName="Flying dummies" allianceID="0" allianceName="" factionID="0" factionName=""/>
                <row characterID="477311614" characterName="Caldari Citizen 24190" corporationID="98169130" corporationName="Corpname" allianceID="0" allianceName="" factionID="0" factionName=""/>
            </rowset>
        </key>
    </result>
    <cachedUntil>2015-02-19 12:13:02</cachedUntil>
</eveapi>
```
`result` will be:
```javascript
{ type: 'apikeyinfo',  // name of the API function
  data: 
      { type: 'Account',
        accessMask: '268435455',
        expires: 'never',
        cachedUntil: '2015-02-19 12:13:02',
        characters: [ 
            { characterID: '94681458',
              characterName: 'Gallente Citizen 013241',
              corporationID: '1001176',
              corporationName: 'Flying dummies',
              allianceID: '0',
              allianceName: '',
              factionID: '0',
              factionName: '' },
            { characterID: '477311614',
              characterName: 'Caldari Citizen 24190',
              corporationID: '98169130',
              corporationName: 'Corpname',
              allianceID: '0',
              allianceName: '',
              factionID: '0',
              factionName: '' } ] },
    param: // call parameters
      { keyid: '3412784',
        vcode: 'qwertyuiop' } }
```
Property named `apikeyinfo` will be added to the `apiKey`. Other words, you can access `result.data` as `apiKey.apikeyinfo`
```javascript
console.dir(apiKey.apikeyinfo)
// see result.data above
```

<a name="access" />
#### 2. Access
Returns all masks that can be accessed by this key OR all API function names of that masks.
```javascript
apiKey.access(mask[, names]);
```
__Arguments__
* `mask`  - integer. AccessMask of the API key
* `names` - boolean value. If you want to get not only masks the key has access to, but names too, you should set it to true.

__Example 1__
```javascript
var apiKey = eveapi.key(keyid, vcode);
console.dir(apiKey.access(268435455));
/* [ 134217728, 67108864, 33554432, 16777216, 8388608, 4194304, 2097152, 1048576, 524288, 262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1 ] */
```
__Example 2__
```javascript
var apiKey = eveapi.key(keyid, vcode);
console.dir(apiKey.access(268435455, true));
/* [ 'accountstatus' ] */
```
__Example 3__
```javascript
var char = eveapi.char(keyid, vcode, characterid);
console.dir(char.access(268435455, true));
/* [ 'accountstatus', 'accountbalance', 'assetlist', 'blueprints', 'calendareventattendees', 'characterinfo', 'charactersheet', 'contactlist', 'contactnotifications', 'contractbids', 'contractitems', 'contracts', 'facwarstats', 'industryjobs', 'industryjobshistory', 'killmails', 'locations', 'mailbodies', 'mailinglists', 'mailmessages', 'marketorders', 'medals', 'notifications', 'notificationtexts', 'planetarycolonies', 'planetarylinks', 'planetarypins', 'planetaryroutes', 'research', 'skillintraining', 'skillqueue', 'standings', 'upcomingcalendarevents', 'walletjournal', 'wallettransactions' ] */
```

<a name="hasAccess" />
#### 3. hasAccess
Checks if API key has access to given function.
```javascript
apiKey.hasAccess(apiType[, mask]);
```
__Arguments__

* `apiType` - name of the API function (see [New Eden Development](https://neweden-dev.com/) or
config/config.js in the module folder).
* `mask` - provide custom access mask if you want. Else `accessMask` property will be used (if it doesn't exist, method will return `true`).

__Example__

```javascript
// apikey.accessMask = 268435455;
console.dir(apiKey.hasAccess('mailmessages'));
// true

console.dir(apiKey.hasAccess('mailmessages', 1));
// false
```
