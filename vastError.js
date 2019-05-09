//VAST ERROR QUIRK SETTINGS
//INDIVIDUAL TROLLS
var murrit = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\>\(\[/,
    suffix: /\]$/,
    separator: null,
    substitions: [
        { original: /#/g, replaceWith: 'h', caseSensitive: true }
    ],
    addPeriods: false
};

var laivan = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: true,
    prefix: null,
    suffix: /\-$/,
    separator: null,
    substitions: [
        { original: /\-[^?!]/g, replaceWith: '. ', caseSensitive: false },
        { original: /\-[?]/g, replaceWith: '?', caseSensitive: false },
        { original: /\-[!]/g, replaceWith: '!', caseSensitive: false }
    ],
    addPeriods: true
};

var arcjec = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: true,
    prefix: /^XDXD/,
    suffix: /XDXD$/,
    separator: null,
    substitions: [],
    addPeriods: true
};

var tazsia = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\~/,
    suffix: /\~$/,
    separator: null,
    substitions: [
        { original: /\+/g, replaceWith: 't', caseSensitive: true }
    ],
    addPeriods: true
};

var albion = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\*/,
    suffix: /\*$/,
    separator: /\*/g,
    substitions: [
        { original: /\s\./, replaceWith: '.', caseSensitive: false },
        { original: /\s\!/, replaceWith: '!', caseSensitive: false },
        { original: /\s\?/, replaceWith: '?', caseSensitive: false }
    ],
    addPeriods: false
};

var ellsee = {
    sentenceCase: 'varies',
    shouts: false,
    firstWordCapitalized: false,
    prefix: null,
    suffix: null,
    separator: null,
    substitions: [
        { original: /\Σ/g, replaceWith: 'e', caseSensitive: true },
        { original: /\¡/g, replaceWith: '!', caseSensitive: false },
        { original: /\¿/g, replaceWith: '?', caseSensitive: false }
    ],
    addPeriods: false
};

var occeus = {
    sentenceCase: 'varies',
    shouts: false,
    firstWordCapitalized: false,
    prefix: null,
    suffix: null,
    separator: null,
    substitions: [
        { original: /\.o\./g, replaceWith: 'o', caseSensitive: true},
        { original: /\.oo\./g, replaceWith: 'oo', caseSensitive: true },
        { original: /(eye|Eye)/g, replaceWith: 'I', caseSensitive: false }
    ],
    addPeriods: false

};

var sovara = {
    sentenceCase: 'lowercase',
    shouts: false,
    firstWordCapitalized: false,
    prefix: /^\(/,
    suffix: /\)$/,
    separator: null,
    substitions: [],
    addPeriods: false
};

var dismas = {
    sentenceCase: 'varies',
    shouts: false,
    firstWordCapitalized: true,
    prefix: null,
    suffix: /\/{3}$/,
    separator: null,
    substitions: [
        { original:/\\\//g, replaceWith: 'v', caseSensitive: true },
        { original: /\/\\/g, replaceWith: 'a', caseSensitive: true }
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

