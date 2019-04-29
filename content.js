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
                    recurseContent(mainContent);
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


//DOM TRAVERSAL
function recurseContent(element) {
    //BASE CASE ONE: a simple span tag with no children
    if (element.nodeName === 'SPAN' && element.children.length === 0) {
        fixQuirk(element);
        return;
    }

    //BASE CASE TWO: an element that's not a span but still has no children
    if (!element.hasChildNodes()) {
        return;
    }

    //otherwise, traverse the children
    const numChildren = element.children.length;

    for (let i = 0; i < numChildren; i++) {
        let currentNode = element.children[i];
        //check for the one irritating case where a single span has a chunk of br tags
        //because people don't know how to act
        if (isMultiLinePesterLog(currentNode)) {
            const splitUpLines = currentNode.innerHTML.split("<br>").map(str => str = str.trim());
            //clear the current content
            currentNode.innerHTML = '';
            splitUpLines.forEach((line, index) => {
                let newSpan = document.createElement('span');
                newSpan.textContent = line;
                fixQuirk(newSpan);
                currentNode.appendChild(newSpan);
                //append a break tag (so long as we're not on the last element)
                if (index !== splitUpLines.length - 1) {
                    currentNode.appendChild(document.createElement('br'));
                }
            });
        }
        else {
            //otherwise, just keep on recursin'
            recurseContent(element.children[i]);
        }
    }
}

//returns TRUE if this particular node is a type of pesterlog span which contains multiple lines of text separated with br
//returns FALSE if there are deeper levels than just text & br
function isMultiLinePesterLog(node) {
    if (node.nodeName !== 'SPAN' || node.children.length === 0) {
        return false;
    }

    let numChildren = node.children.length;
    for (let i = 0; i < numChildren; i++) {
        if (node.children[i].nodeName !== 'BR') {
            return false;
        }
    }
    return true;
}


//TEXT REPLACEMENT
//takes in a basic span and a string of text that should be added to it
function replaceSpanText(span, newText) {
    //last check for any url encodes!
    newText = newText
        .replace(/\&lt\;/g, '<')
        .replace(/&lt\;3/g, '<3')
        .replace(/\&gt\;/g, '>')
        .replace(/\&nbsp\;/g, ' ');
    let newTextNode = document.createTextNode(newText);
    span.innerHTML = '';
    span.appendChild(newTextNode);
}