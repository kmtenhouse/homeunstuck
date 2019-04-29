//MAIN SCRIPT
//Attach an event listener to the Skorpe Log button
console.log("Extension loaded!");

/* setTimeout(function () {
    const chatlog = document.getElementById('content');
    console.log("Firing quirk fix");
    recurseContent(chatlog);
}, 1000); */

//MUTATION LISTENER
var observer = new MutationObserver(mutationCallback);

var observerOptions = {
    childList: false,
    attributes: true,
    subtree: false //Omit or set to false to observe only changes to the parent node.
  }

let spoilerDiv;

var spoilerDivCollection = document.getElementsByClassName('spoiler');
for(div of spoilerDivCollection) {
    if(div.classList.contains('spoiler') && div.nodeName === 'DIV') {
        console.log("Div found");
        spoilerDiv = div;
        observer.observe(spoilerDiv, observerOptions);
    }
}

//BUTTON CLICK
var button = document.getElementsByTagName('input')[0];

button.addEventListener('click', function() {
    if(this.classList.contains('closed')) {
        console.log("Opening");
        this.classList.remove('closed');
        this.classList.add('open');
        spoilerDiv.classList.remove('closed');
        spoilerDiv.classList.add('open');
    }
    else {
        console.log("Closing");
        this.classList.remove('open');
        this.classList.add('closed');
        spoilerDiv.classList.remove('open');
        spoilerDiv.classList.add('closed');
    }
});

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

//DETERMINE AND FIX QUIRK
//EXPECTS a source node (SPAN with no children)
function fixQuirk(span) {
    const spanText = span.textContent.trim();
    let pesterLogID = spanText.slice(0, 3);
    switch (pesterLogID) {
        case "UK:":
            fixMurrit(span);
            break;
        case "WA:":
            fixLaivan(span);
            break;
        case "AH:":
            fixArcjec(span);
            break;
        default:
            break;
    }
}

//TEXT REPLACEMENT
//takes in a basic span and a string of text that should be added to it
function replaceSpanText(span, newText) {
    let newTextNode = document.createTextNode(newText);
    span.innerHTML = '';
    span.appendChild(newTextNode);
}