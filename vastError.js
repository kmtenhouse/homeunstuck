//VAST ERROR QUIRK SETTINGS
//INDIVIDUAL TROLLS
var murrit = {
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
    ]
};

var laivan = {
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
    ]
};

var arcjec = {
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
    substitions: []
};

var tazsia = {
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
    ]
};

var albion = {
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
    ]
};

var ellsee = {
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
    ]
};

var occeus = {
    sentences: {
        enforceCase: null,
        capitalizeSentences: false,
        addMissingPeriods: false
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
    ]
};

var dismas = {
    sentences: {
        enforceCase: null,
        capitalizeSentences: true,
        addMissingPeriods: false
    },
    prefix: null,
    suffix: /\/\/\/$/,
    separator: {
        replace: false,
        original: ' ',
        replaceWith: null
    },
    substitions: [
        { original: /\\\//g, replaceWith: 'v', isCaseSensitive: true },
        { original: /\/\\/g, replaceWith: 'a', isCaseSensitive: true }
    ]
};

var sovara = {
    sentences: {
        enforceCase: 'lowercase',
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
    substitions: []
};

var dismas = {
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
    ]
};

//MAP OF PESTERLOGIDS TO TROLLS
var vastErrorQuirks = {
    "UK": murrit,
    "BOOBDRONE": murrit,
    "MURRIT": murrit,
    "WA": laivan,
    "BLUE GUY": laivan,
    "LAIVAN": laivan,
    "AH": arcjec,
    "ARCJEC": arcjec,
    "KIDJEC": arcjec,
    "PO": tazsia,
    "TAZ": tazsia,
    "TAZSIA": tazsia,
    "DQ": albion,
    "ALBION": albion,
    "EO": ellsee,
    "ELLSEE": ellsee,
    "ME": occeus,
    "OCCEUS": occeus,
    "DISMAS": dismas,
    "GD": dismas,
    "SA": sovara,
    "SOVARA": sovara
};

