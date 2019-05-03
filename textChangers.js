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
    if (characterQuirk.separator !== ' ') {
        str = str.replace(characterQuirk.separator, ' ');
    }

    //perform replacements, if necessary
    if (characterQuirk.substitions) {
        if (characterQuirk.shouts === true) {
            str = shoutSensitiveReplace(str, characterQuirk);
        }
        else {
            str = simpleReplace(str, characterQuirk);
        }
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

    return str;
}

//performs a SHOUT SENSITIVE replacement
//a character SHOUTS when they periodically make entire words upper case
function shoutSensitiveReplace(str, characterQuirk) {
    //first, get the full list of replacements we should exclude from our SHOUT search
    var exclusionList = '';
    characterQuirk.substitions.forEach(function (pattern) {
        exclusionList = exclusionList + pattern.original;
    });

    //now map out which words are SHOUTING prior to any substitutions
    var shoutedWords = str.split(' ').map(
        function (word) {
            return !isLowerCase(word, exclusionList);
        }
    );

    //make the basic substitution
    str = simpleReplace(str, characterQuirk);

    //and finally return the SHOUT adjusted version
    return str.split(' ').map(function (word, index) {
        return (shoutedWords[index] === true ? word.toUpperCase() : word.toLowerCase())
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

