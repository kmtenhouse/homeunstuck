//VAST ERROR QUIRK SETTINGS
//INDIVIDUAL TROLLS
var murrit = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\>\(\[/,
    suffix: /\]$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\#/g, replaceWith: 'h', isCaseSensitive: true }
    ],
    addPeriods: false
};

var laivan = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: true,
    prefix: null,
    suffix: /\-$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\-[^?!]/g, replaceWith: '. ', isCaseSensitive: false },
        { original: /\-[?]/g, replaceWith: '?', isCaseSensitive: false },
        { original: /\-[!]/g, replaceWith: '!', isCaseSensitive: false }
    ],
    addPeriods: true
};

var arcjec = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: true,
    prefix: /^XDXD/,
    suffix: /XDXD$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [],
    addPeriods: true
};

var tazsia = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\~/,
    suffix: /\~$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\+/g, replaceWith: 't', isCaseSensitive: true }
    ],
    addPeriods: true
};

var albion = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\*/,
    suffix: /\*$/,
    separator: {
        replace: false,
        original: '*',
        replaceWith: ' '
    },
    substitions: [
        { original: /\s\./, replaceWith: '.', isCaseSensitive: false },
        { original: /\s\!/, replaceWith: '!', isCaseSensitive: false },
        { original: /\s\?/, replaceWith: '?', isCaseSensitive: false }
    ],
    addPeriods: false
};

var ellsee = {
    sentenceCase: 'varies',
    shouts: false,
    firstWordCapitalized: false,
    prefix: null,
    suffix: null,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\Σ/g, replaceWith: 'e', isCaseSensitive: true },
        { original: /\¡/g, replaceWith: '!', isCaseSensitive: false },
        { original: /\¿/g, replaceWith: '?', isCaseSensitive: false }
    ],
    addPeriods: false
};

var occeus = {
    sentenceCase: 'varies',
    shouts: false,
    firstWordCapitalized: false,
    prefix: null,
    suffix: null,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\.o\./g, replaceWith: 'o', isCaseSensitive: true },
        { original: /\.oo\./g, replaceWith: 'oo', isCaseSensitive: true },
        { original: /(eye|Eye)/g, replaceWith: 'I', isCaseSensitive: false }
    ],
    addPeriods: false
};

var dismas = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: true,
    prefix: null,
    suffix: /\/\/\/$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\\\//g, replaceWith: 'v', isCaseSensitive: true },
        { original: /\/\\/g, replaceWith: 'a', isCaseSensitive: true }
    ],
    addPeriods: false
};

var sovara = {
    sentenceCase: 'lowercase',
    shouts: false,
    firstWordCapitalized: false,
    prefix: /^\(/,
    suffix: /\)$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [],
    addPeriods: false
};

var dismas = {
    sentenceCase: 'varies',
    shouts: false,
    firstWordCapitalized: true,
    prefix: null,
    suffix: /\/{3}$/,
    separator: {
        replace: false,
        original: ' '
    },
    substitions: [
        { original: /\\\//g, replaceWith: 'v', isCaseSensitive: true },
        { original: /\/\\/g, replaceWith: 'a', isCaseSensitive: true }
    ],
    addPeriods: true
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

