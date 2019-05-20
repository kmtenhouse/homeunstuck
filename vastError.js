//VAST ERROR QUIRK SETTINGS
//INDIVIDUAL TROLLS

var murrit = {
    name: "Murrit",
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: false
    },
    prefix: /^\>\(\[/,
    suffix: /\]$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\#/g, replaceWith: 'h', isCaseSensitive: true }
    ],
    whiteList: []
};

var laivan = {
    name: "Laivan",
    sentences: {
        enforceCase: null,
        capitalizeSentences: true,
        addMissingPeriods: true
    },
    prefix: null,
    suffix: /\-$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\-(?=[\!\?\,\;\.\!])/g, replaceWith: '', isCaseSensitive: false },
        { original: /\-[\s]{1,}/g, replaceWith: '. ', isCaseSensitive: false }
    ],
    whiteList: []
};

var arcjec = {
    name: "Arcjec",
    sentences: {
        enforceCase: null,
        capitalizeSentences: true,
        addMissingPeriods: true
    },
    prefix: /^XDXD/,
    suffix: /XDXD$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [],
    whiteList: []
};

var tazsia = {
    name: "Tazsia",
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: true
    },
    prefix: /^\~/,
    suffix: /\~$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\+/g, replaceWith: 't', isCaseSensitive: true }
    ],
    whiteList: ['+m+']
};

var albion = {
    name: "Albion",
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: false
    },
    prefix: /^\*/,
    suffix: /\*$/,
    separator: {
        replace: true,
        original: '*',
        replaceWith: ' '
    },
    substitions: [
    ],
    whiteList: []
};

var ellsee = {
    name: "Ellsee",
    sentences: {
        enforceCase: null,
        capitalizeSentences: true,
        addMissingPeriods: true
    },
    prefix: null,
    suffix: null,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\Σ/g, replaceWith: 'e', isCaseSensitive: true },
        { original: /\¡/g, replaceWith: '!', isCaseSensitive: false },
        { original: /\¿/g, replaceWith: '?', isCaseSensitive: false }
    ],
    whiteList: []
};

var occeus = {
    name: "Occeus",
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: true
    },
    prefix: null,
    suffix: null,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\.o\./g, replaceWith: 'o', isCaseSensitive: true },
        { original: /\.oo\./g, replaceWith: 'oo', isCaseSensitive: true },
        { original: /(eye|Eye)/g, replaceWith: 'I', isCaseSensitive: false }
    ],
    whiteList: []
};

var sovara = {
    name: "Sovara",
    sentences: {
        enforceCase: 'propercase',
        capitalizeSentences: false,
        addMissingPeriods: false
    },
    prefix: /^\(/,
    suffix: /\)$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [],
    whiteList: []
};

var dismas = {
    name: "Dismas",
    sentences: {
        enforceCase: null,
        capitalizeSentences: true,
        addMissingPeriods: true
    },
    prefix: null,
    suffix: /\/{3}$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\\\//g, replaceWith: 'v', isCaseSensitive: true },
        { original: /\/\\/g, replaceWith: 'a', isCaseSensitive: true }
    ],
    whiteList: []
};

var arcjecDenizens = {
    name: "snakeDenizens",
    sentences: {
        enforceCase: 'lowercase',
        capitalizeSentences: true,
        addMissingPeriods: true
    },
    prefix: null,
    suffix: /\/{3}$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\\\//g, replaceWith: 'v', isCaseSensitive: true },
        { original: /\/\\/g, replaceWith: 'a', isCaseSensitive: true }
    ],
    whiteList: []
};

var albionGuardian = {
    name: "Guardianspirit",
    sentences: {
        enforceCase: 'lowercase',
        capitalizeSentences: false,
        addMissingPeriods: false
    },
    prefix: /^\*{6}/,
    suffix: /\*{5}\-$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [],
    whiteList: []
};

var hamifi = {
    name: "Hamifi",
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: false
    },
    prefix: null,
    suffix: '∞',
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [],
    whiteList: []
}

var sestro = {
    name: "Sestro",
    sentences: {
        enforceCase: 'propercase',
        capitalizeSentences: true,
        addMissingPeriods: false
    },
    prefix: '∞',
    suffix: null,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [],
    whiteList: []
}

var rodere = {
    name: "Rodere",
    sentences: {
        enforceCase: 'propercase',
        capitalizeSentences: true,
        addMissingPeriods: true
    },
    prefix: '-',
    suffix: '--x',
    separator: {
        replace: true,
        original: '-',
        replaceWith: ' '
    },
    substitions: [],
    whiteList: []
}

var vellia = {
    name: "Vellia",
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: false
    },
    prefix: '=',
    suffix: '=',
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\:t\:/g, replaceWith: 't', isCaseSensitive: false }
    ],
    whiteList: []
}


//MAP PESTERLOGIDS TO TROLLS
//creates a quirk map
function createQuirkMap() {
    //look through our storage to figure out which quirks are enabled

    var quirkMap = new Map([
        ["UK", murrit],
        ["BOOBDRONE", murrit],
        ["MURRIT", murrit],
        ["BOOBDROBE", murrit],
        ["WA", laivan],
        ["BLUE GUY", laivan],
        ["LAIVAN", laivan],
        ["AH", arcjec],
        ["ARCJEC", arcjec],
        ["KIDJEC", arcjec],
        ["PO", tazsia],
        ["TAZ", tazsia],
        ["TAZSIA", tazsia],
        ["DQ", albion],
        ["ALBION", albion],
        ["EO", ellsee],
        ["ELLSEE", ellsee],
        ["ME", occeus],
        ["OCCEUS", occeus],
        ["DISMAS", dismas],
        ["GD", dismas],
        ["SA", sovara],
        ["SOVARA", sovara],
        ["COLORFUL SNAKE", arcjecDenizens],
        ["GUY", arcjecDenizens],
        ["LADY", arcjecDenizens],
        ["GUARDIANSPIRIT", albionGuardian],
        ["HAMIFI", hamifi],
        ["SESTRO", sestro],
        ["RODERE", rodere],
        ["VELLIA", vellia]
    ]);
    return quirkMap;
}

function getDataFromStorage(keyName) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get([keyName], function (savedObj) {
            if(savedObj[keyName]!==null && savedObj[keyName]!==undefined) {
                resolve(savedObj[keyName]);
            }
            else {
                reject(new Error("No data available"));
            }
        });
    });
}

//CREATE MAP OF ALL QUIRKS
/* var vastErrorQuirks =  new Map([
    ["UK", murrit],
    ["BOOBDRONE", murrit],
    ["MURRIT", murrit],
    ["BOOBDROBE", murrit],
    ["WA", laivan],
    ["BLUE GUY", laivan],
    ["LAIVAN", laivan],
    ["AH", arcjec],
    ["ARCJEC", arcjec],
    ["KIDJEC", arcjec],
    ["PO", tazsia],
    ["TAZ", tazsia],
    ["TAZSIA", tazsia],
    ["DQ", albion],
    ["ALBION", albion],
    ["EO", ellsee],
    ["ELLSEE", ellsee],
    ["ME", occeus],
    ["OCCEUS", occeus],
    ["DISMAS", dismas],
    ["GD", dismas],
    ["SA", sovara],
    ["SOVARA", sovara],
    ["COLORFUL SNAKE", arcjecDenizens],
    ["GUY", arcjecDenizens],
    ["LADY", arcjecDenizens],
    ["GUARDIANSPIRIT", albionGuardian],
    ["HAMIFI", hamifi],
    ["SESTRO", sestro],
    ["RODERE", rodere],
    ["VELLIA", vellia]
]); */ // = await createQuirkMap();

/* chrome.storage.sync.get(['vastErrorSettings'], function (savedObj) {
    if (!savedObj.vastErrorSettings || Array.isArray(savedObj.vastErrorSettings) === false) {
        //TO-DO: load default settings to both page and object (?)
       console.log("Error no settings");
       return;
    }
    else {
        console.log("Loaded settings!");
        for(character of savedObj.vastErrorSettings) {
            console.log(character);
            //TO-DO: refactor this
            if(character.enabled === false) {
                console.log("Turn off!");
                //delete the character from our map
                for(alias of character.aliases) {
                    vastErrorQuirks.delete(alias);
                }
            }
        }
    }

});
 */