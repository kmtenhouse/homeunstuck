
function fixMurrit(span) {
    console.log(span.innerText);
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