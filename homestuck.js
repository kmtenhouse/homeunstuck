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
var homestuckQuirks = {
    "TZ": terezi
};