//GLOBAL VARIABLES
var vastErrorQuirks = null;

//MAIN SCRIPT
//Attach a mutation listener to the entire document
var observer = new MutationObserver(function (mutations) {
    getQuirkMap()
        .then(function (quirkMap) {
            vastErrorQuirks = quirkMap;
            mutations.forEach(function (mutation) {
                if (mutation.target.nodeName !== 'SCRIPT') {
                    traverseDOM(mutation.target);
                }
            });
        })
        .catch(function (err) {
            console.log("An error has occurred reading the quirk map!");
        });
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
        if ((/^(\s*)(\S+)/).test(node.nodeValue)) {
            let fixedQuirk = fixQuirk(node.nodeValue);

            if (fixedQuirk !== null) {
                node.nodeValue = fixedQuirk;
            }
        }
    }
}

//INITIALIZE VARIABLES
//Promise-based function that initializes a quirk map based on which quirks the user has enabled from the options page
function getQuirkMap() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get('vastErrorSettings', function (savedObj) {
            if (savedObj['vastErrorSettings'] !== null && savedObj['vastErrorSettings'] !== undefined) {
                var baseQuirkMap = vastErrorDefaultQuirks();
                var resultingMap = new Map();
                for (character of allCharacters) {
                    //(TO-DO) grab the current quirk from storage instead
                    //(Right now) grab the current quirk from our uber-map
                    var characterQuirk = baseQuirkMap.get(character.name);
                    if (characterQuirk && character.enabled === true) {
                        for (alias of character.aliases) {
                            resultingMap.set(alias, characterQuirk);
                        }
                    }
                }
                resolve(resultingMap);

            }
            else {
                reject(new Error("No data available"));
            }
        });
    });
}
