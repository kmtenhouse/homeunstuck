//MAIN SCRIPT
//Attach a mutation listener to the content tree
var observer = new MutationObserver(function (mutations) {
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
});

var observerConfig = {
    subtree: true,
    childList: true
};

// Listen to all changes to body and child nodes
var targetNode = document.getElementById('content');

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
            
            if(fixedQuirk!==null) {
                node.nodeValue = fixedQuirk;
                node.parentElement.setAttribute('data-homeunstuck', 'fixed');
            }
        }
    }
}

