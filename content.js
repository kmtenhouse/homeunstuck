//MAIN CODE:
//1) Look for a block of 'spoiler' text (which is where quirks will be hiding in pesterlogs)
//2) If said block exists, set up a mutation listener to check when the 'open' class gets added, as that's when we'll care about changing the text
 
setTimeout(function() {
    console.log("Fixing");
    vastErrorFix();
}, 10000);

/* var parentDOM = document.getElementById('content');
console.log("Loaded extension!");
console.log(parentDOM);
 
//if we found a spoiler block, set a mutation listener

//set up the options for mutation - we're only looking at this spoiler block where the chat log lives
     var observerOptions = {
        childList: false,
        attributes: true,
        subtree: false
    }

    var observer = new MutationObserver(mutationCallback);
    observer.observe(targetNode, observerOptions); */


//MUTATION CALLBACKS
function mutationCallback(mutationList, observer) {
    //we only want to bother replacing the text if the chatlog is being opened
    //we also only want to do this once
    var completedSubstitution = false;
    mutationList.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && !completedSubstitution) {
            mutation.target.classList.forEach(function (value, index) {
                console.log(mutation);
                if (value === "open" && !completedSubstitution) {
                    console.log("Firing!");
                    vastErrorFix();
                    observer.disconnect(); //after we've substituted once, kill the observer
                    completedSubstitution = true;
                }
            });
        }
    });
}

//DETERMINE QUIRK
function vastErrorFix() {
    const allSpans = document.querySelectorAll('span'); //REFACTOR THIS

    for (let node of allSpans) {
        switch (node.innerText.slice(0, 3)) {
            case "UK:": fixMurrit(node);
                break;
            default:
                break;
        }
    }
}

//FIXES FOR QUIRKS
function fixMurrit(node) {
    let newText = node.innerText
        .replace(/#/g, 'h')
        .replace(/UK: \>\(\[/, 'UK: ')
        .replace(/\]$/, '');
    let newTextNode = document.createTextNode(newText);
    node.innerHTML = '';
    node.appendChild(newTextNode);
}