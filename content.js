//GLOBAL VARIABLES
var vastErrorQuirks = null;
initializeQuirkList();

//MAIN SCRIPT
//Attach a mutation listener to the entire document
var observer = new MutationObserver(function (mutations) {
    if (vastErrorQuirks === null) {
        console.log("Quirks need defining!");
        initializeQuirkList();
    } else {
        mutations.forEach(function (mutation) {
            if (mutation.target.nodeName !== 'SCRIPT') {
                //first, make sure the quirk is defined
                traverseDOM(mutation.target);
            }
        });
    }
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
function initializeQuirkList() {
    var quirkMap = new Map([
        ["UK", murrit],
        ["BOOBDRONE", murrit],
        ["MURRIT", murrit],
        ["BOOBDROBE", murrit],
        ["WA", laivan],
        ["BLUE GUY", laivan],
        ["LAIVAN", laivan],
        ["AH", arcjec],
        ["ARCJEC", arcjec],
        ["KIDJEC", arcjec],
        ["PO", tazsia],
        ["TAZ", tazsia],
        ["TAZSIA", tazsia],
        ["DQ", albion],
        ["ALBION", albion],
        ["EO", ellsee],
        ["ELLSEE", ellsee],
        ["ME", occeus],
        ["OCCEUS", occeus],
        ["DISMAS", dismas],
        ["GD", dismas],
        ["SA", sovara],
        ["SOVARA", sovara],
        ["COLORFUL SNAKE", arcjecDenizens],
        ["GUY", arcjecDenizens],
        ["LADY", arcjecDenizens],
        ["GUARDIANSPIRIT", albionGuardian],
        ["HAMIFI", hamifi],
        ["SESTRO", sestro],
        ["RODERE", rodere],
        ["VELLIA", vellia]
    ]);

    getDataFromStorage("vastErrorSettings")
        .then(function (allCharacters) {
            //TO-DO: make this less ridiculous
            //go through each quirk and enable (or disable) as needed
            for (character of allCharacters) {
                if (character.enabled === false) {
                    for (alias of character.aliases) {
                        quirkMap.delete(alias);
                    }
                }
            }
            vastErrorQuirks = quirkMap;
        })
        .catch(function (err) {
            console.log(err.message);
            vastErrorQuirks = quirkMap; //default
        });

}

function getDataFromStorage(keyName) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get([keyName], function (savedObj) {
            if (savedObj[keyName] !== null && savedObj[keyName] !== undefined) {
                resolve(savedObj[keyName]);
            }
            else {
                reject(new Error("No data available"));
            }
        });
    });
}
