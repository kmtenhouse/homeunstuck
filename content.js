//MAIN SCRIPT
//Attach a mutation listener to the entire document
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.target.nodeName !== 'SCRIPT') {
            traverseDOM(mutation.target);
        }
    })
});

var observerConfig = {
    subtree: true,
    childList: true
};

// Listen to all changes to the entire body
var targetNode = document.documentElement || document.body;
observer.observe(targetNode, observerConfig);

// HELPER FUNCTIONS
//
//
//DOM TRAVERSAL (with native treewalker)
function traverseDOM(targetNode) {
    var treeWalker = document.createTreeWalker(
        targetNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;

    while (node = treeWalker.nextNode()) {
        //only grab text nodes that aren't whitespace, and also make sure we haven't touched this element before
        if ((/^(\s*)(\S+)/).test(node.nodeValue)) {
            let fixedQuirk = fixQuirk(node.nodeValue);

            if (fixedQuirk !== null) {
                node.nodeValue = fixedQuirk;
            }
        }
    }
}

