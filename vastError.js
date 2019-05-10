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
        { original: /#/g, replaceWith: 'h' }
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
        { original: /\-[^?!]/g, replaceWith: '. ' },
        { original: /\-[?]/g, replaceWith: '?' },
        { original: /\-[!]/g, replaceWith: '!' }
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
        { original: /\+/g, replaceWith: 't' }
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
        { original: /\s\./, replaceWith: '.' },
        { original: /\s\!/, replaceWith: '!' },
        { original: /\s\?/, replaceWith: '?' }
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
        { original: /\Σ/g, replaceWith: 'e' },
        { original: /\¡/g, replaceWith: '!' },
        { original: /\¿/g, replaceWith: '?' }
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
        { original: /\.o\./g, replaceWith: 'o' },
        { original: /(eye|Eye)/g, replaceWith: 'I' }
    ],
    addPeriods: false
};

var dismas = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: true,
    prefix: null,
    suffix: /\/\/\/$/,
    separator: null,
    substitions: [
        { original: /\\\//g, replaceWith: 'v' },
        { original: /\/\\/g, replaceWith: 'a' }
    ],
    addPeriods: false
};

//MAP OF PESTERLOGIDS TO TROLLS
var vastErrorQuirks = {
    "UK": murrit,
    "BOOBDRONE": murrit,
    "MURRIT": murrit,
    "WA": laivan,
    "BLUE GUY": laivan,
    "AH": arcjec,
    "ARCJEC": arcjec,
    "PO": tazsia,
    "TAZ": tazsia,
    "TAZSIA": tazsia,
    "DQ": albion,
    "ALBION": albion,
    "EO": ellsee,
    "ME": occeus,
    "GD": dismas,
    "DISMAS": dismas 
};

