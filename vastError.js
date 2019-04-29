//DETERMINE AND FIX QUIRK (VAST ERROR)
//EXPECTS a source node (SPAN with no children)
function fixQuirk(span) {
    const spanText = span.textContent.trim();
    let colonIndex = spanText.indexOf(':');
    if(colonIndex === -1) {
        return;
    }
    let pesterLogID = spanText.slice(0, colonIndex);
    switch (pesterLogID) {
        case "UK":
            fixMurrit(span);
            break;
        case "WA":
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
        case "GUARDIANSPIRIT":
            fixGuardianSpirit(span);
            break;
        case "GD": 
            fixDismas(span);
            break;
        default:
            break;
    }
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
        .replace(/\+(?=[A-Z])/, 'T')
        .replace(/\+/g, 't')
        .replace(/\~/g, '');

    replaceSpanText(span, newText);
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
        .replace(/\\\//, 'v')
        .replace(/\/\\/g, 'a');

    replaceSpanText(span, newText);
}