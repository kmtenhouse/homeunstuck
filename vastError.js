
function fixMurrit(span) {
    let newText = span.innerText
        .replace(/#/g, 'h')
        .replace(/UK: \>\(\[/, 'UK: ')
        .replace(/\]$/, '');
    replaceSpanText(span, newText);
}

function fixLaivan(span) {
    let newText = span.innerText
        .replace(/\-/g, '');
    replaceSpanText(span, newText);
}