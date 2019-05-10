//MAIN SCRIPT
//Attach a mutation listener to the content tree
//ORIGINAL
/* var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
            if (mutation.addedNodes.length >= 1) {
                if (mutation.addedNodes[0].nodeName !== '#text') {
                    observer.disconnect(); //temporarily turn off our observer because we're going to be manipulating the DOM too
                    const mainContent = document.getElementById('content');
                    console.log("Firing quirk fix");
                    traverseDOM(mainContent);
                    observer.observe(targetNode, observerConfig); //reup the observer since these sites load out of order sometimes
                }
            }
        }
    });
}); */

//NEW
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

// Listen to all changes to body and child nodes
//ORIGINAL
//var targetNode = document.getElementById('content');
//NEW
var targetNode = document.documentElement || document.body;
observer.observe(targetNode, observerConfig);

// HELPER FUNCTIONS
//
//
//DOM TRAVERSAL (breadth-first)

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
                node.parentElement.setAttribute('data-homeunstuck', 'fixed');
            }
        }
    }
}

