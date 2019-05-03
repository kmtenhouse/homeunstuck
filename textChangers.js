//takes in a string and sees if it is a pesterlog that we have configured
//a valid pesterlog begins with an identifer, separated from the remainder of the string by a colon
//Ex: 
//KK: I DON'T KNOW WHAT WE'RE YELLING ABOUT, DAVE.
function fixQuirk(str) {
    str = str.trim(); //make sure to remove any extraneous whitespace
    let colonIndex = str.indexOf(':');
    if (colonIndex === -1) {
        return null;
    }
    let pesterLogID = str.slice(0, colonIndex);
    let pesterLogText = str.slice(colonIndex + 1);

    //TO DO: add in logic that checks which quirk file to load 
    if (!vastErrorQuirks.hasOwnProperty(pesterLogID)) {
        return null;
    }

    let characterQuirk = vastErrorQuirks[pesterLogID];
    return pesterLogID + ": " + parseQuirk(pesterLogText, characterQuirk);
}

function parseQuirk(str, characterQuirk) {
    str = str.trim();
    //remove prefixes and suffixes first for simplicity
    if (characterQuirk.prefix) {
        str = str.replace(characterQuirk.prefix, '');
    }
    if (characterQuirk.suffix) {
        str = str.replace(characterQuirk.suffix, '');
    }

    //fix any other separators
    if (characterQuirk.separator) {
        console.log("Separator needed!");
        str = str.replace(characterQuirk.separator, ' ');
    }

    //perform replacements, if necessary
    if (characterQuirk.substitions) {
        str = simpleReplace(str, characterQuirk);
        /* if (characterQuirk.shouts === true || characterQuirk.firstWordCapitalized === true) {
            str = caseSensitiveReplace(str, characterQuirk);
        }
        else { //save some cycles if we don't have to care about the case
            str = simpleReplace(str, characterQuirk);
        } */
    }

    //finally, check for any overall case situations
    if (characterQuirk.sentenceCase === 'lowercase') {
        str = str.toLowerCase();
    }
    else if (characterQuirk.sentenceCase === 'uppercase') {
        str = str.toUpperCase();
    }

    if (characterQuirk.firstWordCapitalized === true) {
        let allSentences = str.split('.');
        str = allSentences.map(function (sentence) {
            sentence = sentence.trim();
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }).join('. ');
    }

    //and literally at the end of all things...
    str = str.trim();
    if (characterQuirk.addPeriods === true) {
        if (/([^!?,.]$)/.test(str)) {
            str = str + ".";
        }
    }

    return str;
}

//performs a case sensitive replacement that pays attention to Proper Case and SHOUTING
//a character SHOUTS when they periodically make entire words upper case
function caseSensitiveReplace(str, characterQuirk) {
    //first, get the full list of replacements we should exclude from our SHOUT search
    var exclusionList = '';
    characterQuirk.substitions.forEach(function (pattern) {
        exclusionList = exclusionList + pattern.original + pattern.replaceWith;
    });

    //now map out which words are SHOUTING prior to any substitutions
    var caseMap = str.split(' ').map(
        function (word) {
            if (isProperCase(word)) {
                return 'p';
            }
            else if (!isLowerCase(word)) {
                return 'u';
            }
            else {
                return 'l';
            }
        }
    );

    //make the basic substitution
    str = simpleReplace(str, characterQuirk);

    //and finally return the SHOUT adjusted version
    return str.split(' ').map(function (word, index) {
        if (caseMap[index] === 'p') {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        else {
            return (caseMap[index] === 'l' ? word.toLowerCase() : word.toUpperCase());
        }
    }).join(' ');
}

function simpleReplace(str, characterQuirk) {
    for (let i = 0; i < characterQuirk.substitions.length; i++) {
        let originalPattern = characterQuirk.substitions[i].original;
        let replaceWith = characterQuirk.substitions[i].replaceWith;
        str = str.replace(originalPattern, replaceWith);
    }
    return str;
}

//Tests if a particular string is lower case (excluding any characters provided as exceptions, because some typing quirks are mixed-case on purpose (Ex: 'HOW ARE YOu THE uNIVERSE LOVES YOu'))
function isLowerCase(str, exceptions = []) {
    var allLetters = str.split('');
    for (let i = 0; i < allLetters.length; i++) {
        let currentLetter = allLetters[i];
        if (!exceptions || !exceptions.includes(currentLetter)) {
            //if there are no exceptions, or if the exceptions list doesn't include this particular letter, check if the letter is uppercase
            if (currentLetter !== currentLetter.toLowerCase() && currentLetter === currentLetter.toUpperCase()) {
                //as soon as we hit an uppercase letter, bomb out of the evalution
                return false;
            }
        }
    }
    return true;
}

//Tests if a particular string is Proper Case (first letter capitalized; remaining letters lowercase)
//NOTE: if the initial character is indeterminate (like a number or hash) we err on the side of NOT proper cased
function isProperCase(str, exceptions = []) {
    return (
        /[A-Z]/.test(str.charAt(0)) &&
        str.charAt(0) === str.charAt(0).toUpperCase() &&
        isLowerCase(str.slice(1), exceptions)
    );
}

