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
            }
        }
    },
    Char: {
        defaultFields: ['cachedUntil'],
        param: ['keyid', 'vcode', 'characterid'],
        API: {
            accountbalance: {
                accessMask: 1,
                url: 'char/accountbalance',
                disabled: false
            },               
            assetlist: {
                accessMask: 2,
                url: 'char/assetlist',
                disabled: false
            },
            blueprints: {
                accessMask: 2,
                url: 'char/blueprints',
                disabled: false
            },
            calendareventattendees: {
                accessMask: 4,
                url: 'char/calendareventattendees',
                param: ['eventid'],
                dependsOn: "this.CharUpcomingCalendarEvents",
                disabled: false
            },
            characterinfo: {
                accessMask: 16777216,
                prefix: 'eve/',
                url: 'eve/characterinfo',
                disabled: false
            },
            charactersheet: {
                accessMask: 8,
                url: 'char/charactersheet',
                disabled: false
            },
            contactlist: {
                accessMask: 16,
                url: 'char/contactlist',
                disabled: false
            },
            contactnotifications: {
                accessMask: 32,
                url: 'char/contactnotifications',
                disabled: false
            },
            contractbids: {
                accessMask: 67108864,
                url: 'char/contractbids',
                param: ['contractid'],
                dependsOn: "this.CharContracts",
                disabled: false
            },
            contractitems: {
                accessMask: 67108864,
                url: 'char/contractitems',
                param: ['contractid'],
                dependsOn: "this.CharContracts",
                disabled: false
            },
            contracts: {
                accessMask: 67108864,
                url: 'char/contracts',
                disabled: false
            },
            facwarstats: {
                accessMask: 64,
                url: 'char/facwarstats',
                disabled: false
            },
            industryjobs: {
                accessMask: 128,
                url: 'char/industryjobs',
                disabled: false
            },
            industryjobshistory: {
                accessMask: 128,
                url: 'char/industryjobshistory',
                disabled: false
            },
            killmails: {
                accessMask: 256,
                url: 'char/killmails',
                optionalParam: ['fromid', 'rowcount'],
                disabled: false
            },
            locations: {
                accessMask: 134217728,
                url: 'char/locations',
                param: ['ids'],
                dependsOn: "this.CharAssets",
                disabled: false
            },
            mailbodies: {
                accessMask: 512,
                url: 'char/mailbodies',
                param: ['ids'],
                dependsOn: "this.CharMailMessages",
                disabled: false
            },
            mailinglists: {
                accessMask: 1024,
                url: 'char/mailinglists',
                disabled: false                
            },
            mailmessages: {
                accessMask: 2048,
                url: 'char/mailmessages',
                disabled: false
            },
            marketorders: {
                accessMask: 4096,
                url: 'char/marketorders',
                optionalParam: ['orderid'],
                disabled: false
            },
            medals: {
                accessMask: 8192,
                url: 'char/medals',
                disabled: false
            },
            notifications: {
                accessMask: 16384,
                url: 'char/notifications',
                disabled: false
            },
            notificationtexts: {
                accessMask: 32768,
                url: 'char/notificationtexts',
                param: ['ids'],
                dependsOn: "this.CharNotifications",
                disabled: false
            },
            planetarycolonies: {
                accessMask: 2,
                url: 'char/planetarycolonies',
                disabled: false
            },
            planetarylinks: {
                accessMask: 2,
                url: 'char/planetarylinks',
                param: ['planetid'],
                dependsOn: "this.CharPlanetaryColonies",
                disabled: false
            },
            planetarypins: {
                accessMask: 2,
                url: 'char/planetarypins',
                param: ['planetid'],
                dependsOn: "this.CharPlanetaryColonies",
                disabled: false
            },
            planetaryroutes: {
                accessMask: 2,
                url: 'char/planetaryroutes',
                param: ['planetid'],
                dependsOn: "this.CharPlanetaryColonies",
                disabled: false
            },
            research: {
                accessMask: 65536,
                url: 'char/research',
                disabled: false
            },
            skillintraining: {
                accessMask: 131072,
                url: 'char/skillintraining',
                disabled: false
            },
            skillqueue: {
                accessMask: 262144,
                url: 'char/skillqueue',
                disabled: false
            },
            standings: {
                accessMask: 524288,
                url: 'char/standings',
                disabled: false
            },
            upcomingcalendarevents: {
                accessMask: 1048576,
                url: 'char/upcomingcalendarevents',
                disabled: false
            },
            walletjournal: {
                accessMask: 2097152,
                url: 'char/walletjournal',
                optionalParam: ['fromid', 'rowcount'],
                disabled: false
            },
            wallettransactions: {
                accessMask: 4194304,
                url: 'char/wallettransactions',
                optionalParam: ['fromid', 'rowcount'],
                disabled: false
            }
        }
    },
    Eve: {
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
