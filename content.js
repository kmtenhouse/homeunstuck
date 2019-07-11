//MAIN SCRIPTS
//Get the quirk map and then perform an initial pass through the document body to fix any displayed text
getQuirkMap()
    .then(quirkMap => {
        //Run the initial pass on the document itself
        const targetNode = document.documentElement || document.body;
        traverseDOM(targetNode, quirkMap);
        //Attach a mutation listener to the entire document to capture dynamic changes as readers interact with the comic pages
        observeDOM(targetNode, quirkMap);
    })
    .catch(err => {
        console.log(`${err.name}\nAn error has occurred reading the quirk map!  Quirks cannot be corrected at this time.`);
    });

//DOM OBSERVATION
function observeDOM(targetNode, quirkMap) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.nodeName !== 'SCRIPT') {
                traverseDOM(mutation.target, quirkMap);
            }
        });
    });

    const observerConfig = {
        subtree: true,
        childList: true
    };

    observer.observe(targetNode, observerConfig);
}

// HELPER FUNCTIONS
//
//
//DOM TRAVERSAL (with native treewalker)
function traverseDOM(targetNode, quirkMap) {
    var treeWalker = document.createTreeWalker(
        targetNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;

    while (node = treeWalker.nextNode()) {
        if ((/^(\s*)(\S+)/).test(node.nodeValue)) {
            let fixedQuirk = fixQuirk(node.nodeValue, quirkMap);

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
                for (character of savedObj['vastErrorSettings']) {
                    //(TO-DO) grab the quirk from storage instead
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

//QUIRK IDENTIFIER
//takes in a string and sees if it is a pesterlog that we have configured
//a valid pesterlog begins with an identifer, separated from the remainder of the string by a colon
//Ex: 
//KK: I DON'T KNOW WHAT WE'RE YELLING ABOUT, DAVE.
//Pesterlog ID is 'KK'; pesterlog text is "I DON'T KNOW WHAT WE'RE YELLING ABOUT, DAVE."
function fixQuirk(str, quirkMap) {
    str = str.trim(); //make sure to remove any extraneous whitespace
    let colonIndex = str.indexOf(':');
    if (colonIndex === -1) {
        return null;
    }
    let pesterLogID = str.slice(0, colonIndex);
    let pesterLogText = str.slice(colonIndex + 1);

    if (!quirkMap.has(pesterLogID)) {
        return null;
    }

    let characterQuirk = quirkMap.get(pesterLogID);

    return pesterLogID + ": " + parseQuirk(pesterLogText, characterQuirk);
}

//QUIRK PARSING
//Takes in a string and a quirk object
//Based on the settings in the object, returns a transformed string
function parseQuirk(str, characterQuirk) {
    //start by trimming the incoming string of any excess whitespace
    str = str.trim();
    //remove any prefixes and suffixes first for simplicity
    if (characterQuirk.prefix) {
        str = str.replace(characterQuirk.prefix, '');
    }
    if (characterQuirk.suffix) {
        str = str.replace(characterQuirk.suffix, '');
    }

    //fix any word separators
    if (characterQuirk.separator.replace) {

        var escapedOriginal = escapeRegExp(characterQuirk.separator.original);
        var replaceWith = characterQuirk.separator.replaceWith;

        //Case One: punctuation  
        //We remove the separator and then leave the punctuation itself
        //Example (quirk: -): I guess I'm fine-!  =>  I guess I'm fine!
        var separatorBeforePunctuation = new RegExp(escapedOriginal + '(?=[\!\?\,\;\.\!])', 'g');
        str = str.replace(separatorBeforePunctuation, '');

        //Case Two (quirk *): in between word spacing
        //Remove the current separator and replace with the new one
        //Example: I*am*happy. => I am happy.
        var betweenWords = new RegExp(escapedOriginal, 'g');
        str = str.replace(betweenWords, replaceWith);
    }

    //swap out any special characters as necessary
    if (characterQuirk.substitions) {
        //if we have no whitelist, and we're going to enforce the case to ALL UPPER or all lower anyway, we can do fast replacements
        if (characterQuirk.whiteList.length === 0 && !caseSensitiveSubstitutions(characterQuirk)) {
            str = simpleReplace(str, characterQuirk);
        }
        //otherwise we have to do the more computationally expensive word-by-word replacement
        else {
            str = wordByWordReplace(str, characterQuirk);
        }
    }

    //finally, check for any overall case situations
    if (characterQuirk.sentences.enforceCase === 'lowercase') {
        str = str.toLowerCase();
    }
    else if (characterQuirk.sentences.enforceCase === 'uppercase') {
        str = str.toUpperCase();
    }
    else if (characterQuirk.sentences.enforceCase === 'propercase') {
        str = str.toLowerCase();
        str = capitalizeSentences(str, characterQuirk);
        //special case: make sure we change any lowercase i's to I
        str = str.replace(/\bi\b/g, 'I');
    }

    //capitalize sentences as needed
    if (characterQuirk.sentences.capitalizeSentences === true) {
        str = capitalizeSentences(str, characterQuirk);
    }

    //and literally at the end of all things...make sure we're not missing any trailing periods
    if (characterQuirk.sentences.addMissingPeriods === true) {
        str = str.trim();
        if (/[^\!\.\?\;\'\)\}]{1,}$/.test(str)) {
            str = str + ".";
        }
    }

    return str;
}