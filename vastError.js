//DETERMINE AND FIX QUIRK (VAST ERROR)
//EXPECTS a source node (SPAN with no children)
function fixQuirk(span) {
    const spanText = span.textContent.trim();
    let colonIndex = spanText.indexOf(':');
    if (colonIndex === -1) {
        return;
    }
    let pesterLogID = spanText.slice(0, colonIndex);
    switch (pesterLogID) {
        case "UK":
            fixMurrit(span);
            break;
        case "BOOBDRONE":
            fixMurrit(span);
            break;
        case "WA":
            fixLaivan(span);
            break;
        case "BLUE GUY":
            fixLaivan(span);
            break;
        case "AH":
            fixArcjec(span);
            break;
        case "DQ":
            fixAlbion(span);
            break;
        case "ALBION":
            fixAlbion(span);
            break;
        case "PO":
            fixTaz(span);
            break;
        case "PD":
            fixSerpaz(span);
            break;
        case "GUARDIANSPIRIT":
            fixGuardianSpirit(span);
            break;
        case "GD":
            fixDismas(span);
            break;
        case "DISMAS":
            fixDismas(span);
            break;
        case "SA": 
            fixSovara(span);
            break;
        case "EO":
            fixEllsee(span); 
            break;
        case "ME":
            fixOcceus(span);
            break;
        default:
            break;
    }
}

//GENERAL HELPERS
//Accepts a string and determines if any words should be all caps
function allCapsWords(str) {
    var allWords = str.split(' ');
    var fixedWords = allWords.map(word => {
        return (word.match(/[A-Z]{2,}/) ? word.toUpperCase() : word);
    });
    return fixedWords.join(' ');
}

function fixMurrit(span) {
    let newText = span.innerText
        .replace(/(\#(?=[A-Z]))/g, 'H')
        .replace(/#/g, 'h')
        .replace(/\>\(\[/, ' ')
        .replace(/\&gt;\(\[/, ' ')
        .replace(/\]$/, '');

    replaceSpanText(span, newText);
}

function fixLaivan(span) {
    let newText = span.innerText
        .replace(/\-$/, '.')
        .replace(/\-/g, '');

    replaceSpanText(span, newText);
}

function fixArcjec(span) {
    let newText = span.innerText
        .replace(/(XDXD?\s)/, '')
        .replace(/\s(XDXD)$/, '');

    replaceSpanText(span, newText);
}

function fixAlbion(span) {
    let newText = span.innerText
        .replace(/(\*(?=\?)|\*(?=\.)|\*(?=\!))/, '')
        .replace(/\*/g, ' ');

    replaceSpanText(span, newText);
}

function fixTaz(span) {
    let newText = span.innerText
        .replace(/\+(?=[a-z]{1,}\'*)/g, 't')
        .replace(/(?![A-Z]\'*)\+/g, 't')
        .replace(/\~/g, '');

    replaceSpanText(span, allCapsWords(newText));
}

function fixGuardianSpirit(span) {
    let newText = span.innerText
        .replace(/\*/g, '')
        .replace(/\-/g, '');

    replaceSpanText(span, newText);
}

function fixDismas(span) {
    let newText = span.innerText
        .replace(/\/{3}$/, '')
        .replace(/^GD:\ \\\//, 'GD: V')
        .replace(/^GD:\ \/\\/, 'GD: A')
        .replace(/\\\//g, 'v')
        .replace(/\/\\/g, 'a');

    replaceSpanText(span, newText);
}

function fixSerpaz(span) {
    span.setAttribute("style", 'font-family: "courier", "monospace";');
}

function fixSovara(span) {
    let newText = span.innerText
    .replace(/^SA:\s\(/, 'SA: ')
    .replace(/\)$/, '');
    replaceSpanText(span, newText);
    span.setAttribute('style', 'font-style: normal');
}

function fixEllsee(span) {
    let newText = span.innerText
    .replace(/\Σ/g, 'e')
    .replace(/\¡/g, '!')
    .replace(/\¿/g, '?');
    replaceSpanText(span, newText);
}

function fixOcceus(span) {
    let newText = span.innerText
    .replace(/\.o\./g, 'o')
    .replace(/(eye|Eye)/g, 'I');
    replaceSpanText(span, newText);
}