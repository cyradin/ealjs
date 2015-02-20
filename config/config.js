module.exports = {
    masks: [134217728, 67108864, 33554432, 16777216, 8388608, 4194304, 2097152,
        1048576, 524288, 262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048,
        1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1],
    core: {
        url: 'https://api.eveonline.com/',
        ext: '.xml.aspx?'
    },
    Account: {
        defaultFields: ['cachedUntil'],
        param: ['keyid', 'vcode'],
        API: {
            accountstatus: {
                accessMask: 33554432,
                url: 'account/accountstatus'
            },
            apikeyinfo: {
                url: 'account/apikeyinfo'
            },
            characters: {
                url: 'account/characters'
            }
        }
    },
    Char: {
        defaultFields: ['cachedUntil'],
        param: ['keyid', 'vcode', 'characterid'],
        API: {
            accountbalance: {
                accessMask: 1,
                url: 'char/accountbalance'
            },               
            assetlist: {
                accessMask: 2,
                url: 'char/assetlist'
            },
            blueprints: {
                accessMask: 2,
                url: 'char/blueprints'
            },
            calendareventattendees: {
                accessMask: 4,
                url: 'char/calendareventattendees',
                param: ['eventid']
            },
            characterinfo: {
                accessMask: 16777216,
                prefix: 'eve/',
                url: 'eve/characterinfo'
            },
            charactersheet: {
                accessMask: 8,
                url: 'char/charactersheet'
            },
            contactlist: {
                accessMask: 16,
                url: 'char/contactlist'
            },
            contactnotifications: {
                accessMask: 32,
                url: 'char/contactnotifications'
            },
            contractbids: {
                accessMask: 67108864,
                url: 'char/contractbids',
                param: ['contractid']
            },
            contractitems: {
                accessMask: 67108864,
                url: 'char/contractitems',
                param: ['contractid']
            },
            contracts: {
                accessMask: 67108864,
                url: 'char/contracts'
            },
            facwarstats: {
                accessMask: 64,
                url: 'char/facwarstats'
            },
            industryjobs: {
                accessMask: 128,
                url: 'char/industryjobs'
            },
            industryjobshistory: {
                accessMask: 128,
                url: 'char/industryjobshistory'
            },
            killmails: {
                accessMask: 256,
                url: 'char/killmails',
                optionalParam: ['fromid', 'rowcount']
            },
            locations: {
                accessMask: 134217728,
                url: 'char/locations',
                param: ['ids']
            },
            mailbodies: {
                accessMask: 512,
                url: 'char/mailbodies',
                param: ['ids']
            },
            mailinglists: {
                accessMask: 1024,
                url: 'char/mailinglists'
            },
            mailmessages: {
                accessMask: 2048,
                url: 'char/mailmessages'
            },
            marketorders: {
                accessMask: 4096,
                url: 'char/marketorders',
                optionalParam: ['orderid']
            },
            medals: {
                accessMask: 8192,
                url: 'char/medals'
            },
            notifications: {
                accessMask: 16384,
                url: 'char/notifications'
            },
            notificationtexts: {
                accessMask: 32768,
                url: 'char/notificationtexts',
                param: ['ids']
            },
            planetarycolonies: {
                accessMask: 2,
                url: 'char/planetarycolonies'
            },
            planetarylinks: {
                accessMask: 2,
                url: 'char/planetarylinks',
                param: ['planetid']
            },
            planetarypins: {
                accessMask: 2,
                url: 'char/planetarypins',
                param: ['planetid']
            },
            planetaryroutes: {
                accessMask: 2,
                url: 'char/planetaryroutes',
                param: ['planetid']
            },
            research: {
                accessMask: 65536,
                url: 'char/research'
            },
            skillintraining: {
                accessMask: 131072,
                url: 'char/skillintraining'
            },
            skillqueue: {
                accessMask: 262144,
                url: 'char/skillqueue'
            },
            standings: {
                accessMask: 524288,
                url: 'char/standings'
            },
            upcomingcalendarevents: {
                accessMask: 1048576,
                url: 'char/upcomingcalendarevents'
            },
            walletjournal: {
                accessMask: 2097152,
                url: 'char/walletjournal',
                optionalParam: ['fromid', 'rowcount']
            },
            wallettransactions: {
                accessMask: 4194304,
                url: 'char/wallettransactions',
                optionalParam: ['fromid', 'rowcount']
            }
        }
    },
    Server: {
        API: {
            alliancelist: {
                url: 'eve/alliancelist'
            },
            calllist: {
                url: 'api/calllist'
            },
            characteraffiliation: {
                url: 'eve/characteraffiliation',
                param: ['ids']
            },
            characterid: {
                url: 'eve/characterid',
                param: ['names']
            },
            characterinfo: {
                url: 'eve/characterinfo',
                param: ['characterid']
            },
            charactername: {
                url: 'eve/charactername',
                param: ['ids']
            },
            conquerablestationlist: {
                url: 'eve/conquerablestationlist'
            },
            errorlist: {
                url: 'eve/errorlist'
            },
            facwarstats: {
                url: 'eve/facwarstats' 
            },
            facwartopstats: {
                url: 'eve/facwartopstats'
            },
            reftypes: {
                url: 'eve/reftypes'
            },
            serverstatus: {
                url: 'server/serverstatus'
            },
            skilltree: {
                url: 'eve/skilltree'
            }
        }
    }
};
