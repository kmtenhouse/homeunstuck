//VAST ERROR - DEFAULT QUIRK SETTINGS
function vastErrorDefaultQuirks() {
    const murrit = {
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

    const laivan = {
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

    const arcjec = {
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

    const tazsia = {
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

    const albion = {
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

    const ellsee = {
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

    const occeus = {
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

    const sovara = {
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

    const dismas = {
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

    const arcjecDenizens = {
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

    const albionGuardian = {
        name: "Guardianspirit",
        sentences: {
            enforceCase: 'lowercase',
            capitalizeSentences: false,
            addMissingPeriods: false
        },
        prefix: /^\*{6}/,
        suffix: /\*{5,}\-$/,
        separator: {
            replace: false,
            original: ' ',
            replaceWith: null
        },
        substitions: [],
        whiteList: []
    };

    const hamifi = {
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

    const sestro = {
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

    const rodere = {
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

    const vellia = {
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

    //create a map to all these trolls...
    const quirkMap = new Map([
        ["murrit", murrit],
        ["laivan", laivan],
        ["arcjec", arcjec],
        ["tazsia", tazsia],
        ["albion", albion],
        ["ellsee", ellsee],
        ["occeus", occeus],
        ["dismas", dismas],
        ["sovara", sovara],
        ["snakepeople", arcjecDenizens],
        ["guardianspirit", albionGuardian],
        ["hamifi", hamifi],
        ["sestro", sestro],
        ["rodere", rodere],
        ["vellia", vellia]
    ]);

    //...and export
    return quirkMap;
}




