//tests if a particular string is lower case (excluding any characters provided as exceptions)
function isLowerCase(str, exceptions = []) {
    var allLetters = str.split('');
    for (let i = 0; i < allLetters.length; i++) {
        let currentLetter = allLetters[i];
        if (!exceptions || !exceptions.includes(currentLetter)) {
            //if there are no exceptions, or if the exceptions list doesn't include this particular letter, check if the letter is uppercase
            if (currentLetter !== currentLetter.toLowerCase() && currentLetter === currentLetter.toUpperCase()) {
                return false;
            }
        }
    }
    return true;
}

function recurseDOM(targetNode) {
    var walker = document.createTreeWalker(
        targetNode, 
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;

    while (node = walker.nextNode()) {
        //only grab text nodes that aren't whitespace
        if ((/^(\s*)(\S+)/).test(node.nodeValue)) {
            console.log(node.nodeValue.trim());
            node.nodeValue = 'Test';
        }
    }
}

function traverseDOM(node) {
    var result = [];

    (function findTextNodes(current) {
        for (var i = 0; i < current.childNodes.length; i++) {
            var child = current.childNodes[i];
            if (child.nodeType === 3 & child.nodeValue.trim().length != 0) {
                console.log(child.textContent.length + ": " + child.textContent);
                child.textContent = 'test';
            }
            else {
                findTextNodes(child);
            }
        }
    })(node);


}