//takes in a string and sees if it is a pesterlog that we have configured
//a valid pesterlog begins with an identifer, separated from the remainder of the string by a colon
//Ex: 
//KK: I DON'T KNOW WHAT WE'RE YELLING ABOUT, DAVE.
function fixQuirk(str) {
    str = str.trim(); //first, remove any extraneous whitespace
    let colonIndex = str.indexOf(':');
    if (colonIndex === -1) {
        return null;
    }
    let pesterLogID = str.slice(0, colonIndex);
    //TO DO: add in logic that checks which quirk file to load (?)
    if(!vastErrorQuirks.hasOwnProperty(pesterLogID)) {
        return null;
    }

    return pesterLogID + ": " + vastErrorQuirks[pesterLogID].test;
}

//tests if a particular string is lower case (excluding any characters provided as exceptions, because some typing quirks are mixed-case on purpose (Ex: 'HOW ARE YOu THE uNIVERSE LOVES YOu'))
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

