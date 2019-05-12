//takes in a string and sees if it is a pesterlog that we have configured
//a valid pesterlog begins with an identifer, separated from the remainder of the string by a colon
//Ex: 
//KK: I DON'T KNOW WHAT WE'RE YELLING ABOUT, DAVE.
//Pesterlog ID is 'KK'; pesterlog text is "I DON'T KNOW WHAT WE'RE YELLING ABOUT, DAVE."
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

    //fix any other separators
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
        if (caseSensitiveSubstitutions(characterQuirk)) {
            str = caseSensitiveReplaceText(str, characterQuirk);
        }
        else {
            str = replaceText(str, characterQuirk);
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
        //special case: make sure we change any lowercase i's to I
        str = str.replace(/\bi\b/g, 'I');
    }

    //capitalize sentences as needed
    if (characterQuirk.sentences.capitalizeSentences === true || characterQuirk.sentences.enforceCase === 'propercase') {
        str = capitalizeSentences(str, characterQuirk);
    }

    //and literally at the end of all things...make sure we're not missing any trailing periods
    if (characterQuirk.sentences.addMissingPeriods === true) {
        str = str.trim();
        if (/([^!?,.]$)/.test(str)) {
            str = str + ".";
        }
    }

    return str;
}

//TEXT REPLACERS
//
//
//MAIN TEXT REPLACER
//determines which form of text replacement to perform, based on the whitelist
function replaceText(str, characterQuirk) {
    if(characterQuirk.whiteList.length === 0) {
        return simpleReplace(str, characterQuirk);
    }
    else {
        return whiteListReplace(str, characterQuirk);
    }
}

//BASIC TEXT REPLACER
//Simplest form of text replacement:
//Takes in a string and a quirk object
//Returns a string that has had all text substitutions peformed
//Note: assumes that separator substitutions have been completed first
function simpleReplace(str, characterQuirk) {
    for (let i = 0; i < characterQuirk.substitions.length; i++) {
        let originalPattern = characterQuirk.substitions[i].original;
        let replaceWith = characterQuirk.substitions[i].replaceWith;
        str = str.replace(originalPattern, replaceWith);
    }
    return str;
}

//TEXT REPLACER WITH WHITE LIST
//Takes in a string and a quirk object
//Returns a string that has had all text substitutions performed, sans any words that are whitelisted
//Ex: quirk with a substituion for + => t, EXCEPT for the whitelisted emoji +m+
//"+his is a string +m+"  => "this is a string +m+"
//Note: assumes that separator substitutions have been completed first
function whiteListReplace(str, characterQuirk) {
    //start by breaking the string apart on its separator
    var separator = (characterQuirk.separator.replace===true ? characterQuirk.separator.replaceWith : characterQuirk.separator.original);
    var allWords = str.split(separator);

    var fixedWords = allWords.map(function(word) { 
        if(characterQuirk.whiteList.length > 0 && !characterQuirk.whiteList.includes(word)) {
            word = simpleReplace(word, characterQuirk);
        }
        return word;
    });

    return fixedWords.join(separator);
}


//CASE ADJUSTMENT 
//takes in a string and quirk definition; spits out a str with case-sensitive replacements
//Note: assumes that separator substitutions have been completed first
function caseSensitiveReplaceText(str, characterQuirk) {
    //start by doing the replacements we would have done anyway
    str = replaceText(str, characterQuirk);

    //next, split the sentence on whatever separator we are using -- either a custom one, or a simple space
    var currentSeparator = (characterQuirk.separator.replace ? characterQuirk.separator.replaceWith : characterQuirk.separator.original);
    var allWords = str.split(currentSeparator);

    //finally, grab a list of exceptions, based on characters we have already swapped out
    //(ex: if we did a case-insensitive swap from # to 'h', ignore 'h' because its case is not necessarily correct)
    var exceptions = characterQuirk.substitions.map(function (pattern) {
        return pattern.replaceWith;
    });

    var caseMap = allWords.map(function (word) {
        //special case: make sure the word isn't a known emoji; we don't mess with those
        if(characterQuirk.whiteList.length > 0 && characterQuirk.whiteList.includes(word)) {
            return word;
        }

        if (isAllUpperCase(word, exceptions)) {
            return word.toUpperCase();
        }
        else {
            //note: we don't call toLowerCase bc we want to preserve any casing already in play
            return word;
        }
    });

    return caseMap.join(currentSeparator); //note: because .join cannot take a regexp, we have to store the original character
}

//SENTENCE CASE
//
//
//Takes in a string with multiple sentences and changes each sentence to proper case
function capitalizeSentences(str, characterQuirk) {
    //first, grab the punctuation marks so we preserve them
    let punctuationMarks = str.match(/[\!\.\?]{1,}/g) || [];
    let allSentences = str.split(/[\!\.\?]{1,}/);

    str = allSentences.map(function (sentence) {
        sentence = sentence.trim();
        if(sentence === '') { //if the 'sentence' was just extra whitespace, return a truncated string
            return '';
        }
        //figure out which type of punctuation to add, if any
        var currentPunctuation = '';
        if (punctuationMarks.length > 0) {
            currentPunctuation = punctuationMarks.shift();
        }
        else if (characterQuirk.sentences.addMissingPeriods) {
            currentPunctuation = '.';
        }
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + currentPunctuation;
    }).join(' ');

    return str;
}

//STRING VALIDATORS
//
//
//Takes in a word and an (optional) array of characters that should be considered exceptions to the rule
//Output: boolean that indicates if a word is all UPPER CASE
//Examples of upper case words: "HEY", "HELLO, WORLD!"
//If the exceptions array ["u"] is passed in: upper case words include "YOu"
function isAllUpperCase(word, exceptions = []) {
    var upperCaseCount = 0;
    var lowerCaseCount = 0;
    var excludedCount = 0;
    var specialCharacterCount = 0;
    for (let i = 0; i < word.length; i++) {
        let currentLetter = word[i];
        
        if (!exceptions.includes(currentLetter)) {
            if (isUpperCaseLetter(currentLetter)) {
                upperCaseCount++;
            }
            //regular expression will match any of the following special characters: ~`!#$%\^&*+=-[]\;,'/{}|":<>?"0123456789
            else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/g.test(currentLetter)) {
                specialCharacterCount++;
            }
            else {
                lowerCaseCount++;
            }
            //otherwise it's a lowercase character - we don't need to keep track of that count, but this is where we would
        }
        else {
            excludedCount++;
        }
    }

    //now we adjust for the things we excluded (special characters and purposefully excluded characters)
    var adjustedWordLength = word.length - specialCharacterCount - excludedCount;

    if (upperCaseCount === adjustedWordLength && word.length > 1 || word.length===1 && isUpperCaseLetter(word)) {
        return true;
    }
    else {
        return false;
    }
}

//takes in a character and determines if it is an uppercase alphabet letter [A-Z]
//returns false for lowercase alphabet letters, numbers, special characters 
function isUpperCaseLetter(letter) {
    if (letter === letter.toUpperCase()
        && letter !== letter.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}

//TEXT REPLACER HELPERS
//
//
//takes in a quirk object and determines if we should use case sensitive or insensitive substitution 
//swaps will NOT be case sensitive if the entire string will be forcibly set to a specific case 
//swaps will also NOT be case sensitive if there is a case-sensitive substition that must be done
function caseSensitiveSubstitutions(characterQuirk) {
    if (characterQuirk.sentences.enforceCase === 'uppercase' || characterQuirk.sentences.enforceCase === 'lowercase') {
        return false;
    }
    for (let i = 0; i < characterQuirk.substitions.length; i++) {
        if (characterQuirk.substitions[i].isCaseSensitive) {
            return true;
        }
    }
    return false;
}

//REGULAR EXPRESSION HELPERS
//
//
//escapes a string to prep it for regular expressions
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}