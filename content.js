//GLOBAL VARIABLES
var vastErrorQuirks = null;
initializeQuirkList(); //to-do: refactor 

//MAIN SCRIPT
//Attach a mutation listener to the entire document
var observer = new MutationObserver(function (mutations) {
    if (vastErrorQuirks === null) { 
        initializeQuirkList(); //to-do: refactor so this continues with execution after setting
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
        ["murrit", murrit],
        ["laivan", laivan],
        ["arcjec", arcjec],
        ["tazsia", tazsia],
        ["albion", albion],
        ["ellsee", ellsee],
        ["occeus", occeus],
        ["dismas", dismas],
        ["sovara", sovara],
        ["snakepeople", arcjecDenizens],
        ["guardianspirit", albionGuardian],
        ["hamifi", hamifi],
        ["sestro", sestro],
        ["rodere", rodere],
        ["vellia", vellia]
    ]);

    getDataFromStorage("vastErrorSettings")
        .then(function (allCharacters) {
            var resultingMap = new Map();
            for (character of allCharacters) {
                //(TO-DO) grab the current quirk from the character instead
                //(Right now) grab the current quirk for this character from our ur-map
                var characterQuirk = quirkMap.get(character.name);
                if (characterQuirk && character.enabled === true) {
                    for (alias of character.aliases) {
                        resultingMap.set(alias, characterQuirk);
                    }
                }
            }
            vastErrorQuirks = resultingMap;
        })
        .catch(function (err) {
            console.log(err.message);
            //TO-DO: figure out what to do here
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
