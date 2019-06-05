//TEXT REPLACERS
//
//
//BASIC TEXT REPLACER (NO WHITE LIST)
//Simplest form of text replacement:
//Takes in a string and a quirk object
//Returns a string that has had all text substitutions peformed
function simpleReplace(str, characterQuirk) {
    for (let i = 0; i < characterQuirk.substitions.length; i++) {
        let originalPattern = characterQuirk.substitions[i].original;
        let replaceWith = characterQuirk.substitions[i].replaceWith;
        str = str.replace(originalPattern, replaceWith);
    }
    return str;
}

//TEXT REPLACER (WITH WHITE LIST)
//Takes in a string and a quirk object
//Returns a string that has had all text substitutions performed, sans any words that are whitelisted
//Ex: quirk with a substituion for + => t, EXCEPT for the whitelisted emoji +m+
//"+his is a s+ring +m+"  => "this is a string +m+"
//Note: assumes that separator substitutions have been completed first
function wordByWordReplace(str, characterQuirk) {
    //start by breaking the string apart on its separator
    var separator = (characterQuirk.separator.replace === true ? characterQuirk.separator.replaceWith : characterQuirk.separator.original);
    var allWords = str.split(separator);

    //figure out if we need to be case sensitive (and any exceptions that might exist)
    var replacementsAreCaseSensitive = caseSensitiveSubstitutions(characterQuirk);

    //exceptions are the characters that we will replace into the string
    var caseSensitiveExceptions = [];
    if (replacementsAreCaseSensitive) {
        caseSensitiveExceptions = characterQuirk.substitions.map(function (pattern) {
            return pattern.replaceWith;
        });
    }

    var fixedWords = allWords.map(function (word) {
        //if the word is on our whitelist, don't modify it in any way
        if (characterQuirk.whiteList.includes(word)) {
            return word;
        }
        //otherwise, do the replacement operation
        word = simpleReplace(word, characterQuirk);

        //then check if we need to adjust the case
        if (replacementsAreCaseSensitive) {
            word = (isAllUpperCase(word, caseSensitiveExceptions) === true ? word.toUpperCase() : word);
        }
        return word;
    });

    return fixedWords.join(separator);
}


//SENTENCE CASE ADJUSTMENT
//
//
//Takes in a string with multiple sentences and changes each sentence to proper case
function capitalizeSentences(str, characterQuirk) {
    //first, grab the punctuation marks so we preserve them
    let punctuationMarks = str.match(/[\!\.\?]{1,}/g) || [];
    let allSentences = str.split(/[\!\.\?]{1,}/);

    str = allSentences.map(function (sentence) {
        sentence = sentence.trim();
        if (sentence === '') { //if the 'sentence' was just extra whitespace, return a truncated string
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
            else if (/[\’\.~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/g.test(currentLetter)) {
                specialCharacterCount++;
            }
            else {
                lowerCaseCount++;
            }
        }
        else {
            excludedCount++;
        }
    }

    //now we adjust for the things we excluded (special characters and purposefully excluded characters)
    var adjustedWordLength = word.length - specialCharacterCount - excludedCount;

    if (upperCaseCount === adjustedWordLength && word.length > 1 || word.length === 1 && isUpperCaseLetter(word)) {
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
    if (characterQuirk.sentences.enforceCase !== null) {
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