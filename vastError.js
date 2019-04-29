
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
        .replace(/(\*(?=\?)|\*(?=\.))/, '')
        .replace(/\*/g, ' ');

    replaceSpanText(span, newText);
}

function fixTaz(span) {
    let newText = span.innerText
        .replace(/\+/g, 't')
        .replace(/\~/g, '');

    replaceSpanText(span, newText);
}