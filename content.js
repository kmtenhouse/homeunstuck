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