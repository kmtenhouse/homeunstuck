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
        str = str.replace(characterQuirk.separator, ' ');
    }

    //perform individual replacements, if necessary
    if (characterQuirk.substitions) {
        str = caseSensitiveReplace(str, characterQuirk);
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

//performs a simple replace
function simpleReplace(str, characterQuirk) {
    for (let i = 0; i < characterQuirk.substitions.length; i++) {
        let originalPattern = characterQuirk.substitions[i].original;
        let replaceWith = characterQuirk.substitions[i].replaceWith;
        str = str.replace(originalPattern, replaceWith);
    }
    return str;
}

//takes in a string and quirk definition; spits out a str with case-sensitive replacements
function caseSensitiveReplace(str, characterQuirk) {
    //start by doing the replacements we would have done anyway
    str = simpleReplace(str, characterQuirk);
    var allWords = str.split(' ');
    //grab a list of exceptions, based on characters we have already swapped out
    //(ex: if we did a case-insensitive swap from # to 'h', ignore 'h' because its case is not necessarily correct)
    var exceptions = characterQuirk.substitions.map(function (pattern) {
        return pattern.replaceWith;
    });
    //based on the mapped out 
    var caseMap = allWords.map(function (word) {
        if (isAllUpperCase(word, exceptions)) {
            return word.toUpperCase();
        }
        else {
            return word;
            //note: we don't call toLowerCase because we want to preserve any random casing already in play
        }
    });

    return caseMap.join(' ');
}

//NOTE: default assumption is that words are not uppercase
function isAllUpperCase(word, exceptions) {
    var upperCaseCount = 0;
    var lowerCaseCount = 0;
    console.log(word + ":\n Exceptions:" + exceptions);
    for (let i = 0; i < word.length; i++) {
        let currentLetter = word[i];
        console.log(currentLetter + ": " + exceptions.includes(currentLetter));
        if (!exceptions.includes[currentLetter]) { //BUG: perhaps this isn't working?  why
            if (isUpperCaseLetter(currentLetter)) {
                upperCaseCount++;
            }
            else if (word[i].match(/[a-z]/g)) { //BUG: this is finding the lowercase letters, why
                lowerCaseCount++;
            }
        }
    }

    //special case: word initial uppercase we still treat as lowercase (bc sentence capitalization is handled elsewhere)
    if (upperCaseCount === 1 && !isUpperCaseLetter(word.charAt(0))) {
        console.log("uppercase, not word initial");
        return true;
    }
    else if (upperCaseCount > 1) { //otherwise if we had multiple uppercase letters it's time to count that word as SHOUTING
        return true;
    }
    return false;
}

function isUpperCaseLetter(letter) {
    if (letter === letter.toUpperCase()
        && letter !== letter.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}