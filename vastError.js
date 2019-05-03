//VAST ERROR QUIRK SETTINGS
//INDIVIDUAL TROLLS
var murrit = {
    sentenceCase: 'varies',
    shouts: true,
    firstWordCapitalized: false,
    prefix: /^\>\(\[/,
    suffix: /\]$/,
    separator: ' ',
    substitions: [
        { original: /#/g, replaceWith: 'h'}
    ]
};

var terezi = {
    sentenceCase: 'lowercase',
    shouts: false,
    firstWordCapitalized: true,
    prefix: null,
    suffix: null,
    separator: ' ',     
    substitions: [
        { original: /1/g, replaceWith: 'I'},
        { original: /3/g, replaceWith: 'E'},
        { original: /4/g, replaceWith: 'A'}
    ]
};


//MAP OF PESTERLOGIDS TO TROLLS
var vastErrorQuirks = {
    "UK": murrit,
    "BOOBDRONE": murrit,
    "MURRIT": murrit,
    "TZ": terezi
};

