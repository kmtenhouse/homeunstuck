//VAST ERROR QUIRK SETTINGS
//INDIVIDUAL TROLLS
var murrit = {
    case: 'all lowercase',
    firstWordCapitalized: false,
    shouts: true,
    prefix: '>([',
    suffix: ')',
    substitions: [
        { original: /#/g, replaceWith: 'h', caseSensitive: true}
    ],
    test: 'yo whats poppin'
};


//MAP OF PESTERLOGIDS TO TROLLS
var vastErrorQuirks = {
    "UK": murrit,
    "BOOBDRONE": murrit,
    "MURRIT": murrit
};

