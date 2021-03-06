//MAIN SCRIPT --
//LISTENERS
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


//SAVE AND RESTORE FUNCTIONS
function save_options() {
    var characterSettings = document.getElementsByClassName('characterSettings');
    var allCharacterSettings = [];
    for (let settingsBlock of characterSettings) {
        //create a new variable to store the settings for our new character
        var newCharacter = {};
        for (let child of settingsBlock.children) {
            if (child.classList.contains('character-name') && child.value === settingsBlock.getAttribute('id')) {
                newCharacter.name = child.value;
                newCharacter.enabled = (child.checked ? true : false);
            }
            else if (child.classList.contains('character-aliases')) {
                let arrayOfAliases = prepareHandles(child.value);
                newCharacter.aliases = arrayOfAliases;
                //(TO-DO: Put form validation elsewhere before this even happens)
                child.value = arrayOfAliases.join(", ");
            }
        }

        if (newCharacter.name !== undefined && newCharacter.aliases !== undefined && newCharacter.enabled !== undefined) {
            allCharacterSettings.push(newCharacter);
        }
    }

    //save all our compiled settings into the browser
    chrome.storage.sync.set( {
        vastErrorSettings: allCharacterSettings
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 2000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get(['vastErrorSettings'], function (savedObj) {
        if (!savedObj.vastErrorSettings || Array.isArray(savedObj.vastErrorSettings) === false) {
            settingsContainer.textContent = "Error: initial settings failed to load!"
            return;
        }
        //go through all the results and find the right elements, then plop them back on the page
        for (character of savedObj.vastErrorSettings) {
            //Now update the settings page to reflect as well
            var characterSettingsDIV = document.getElementById(character.name.toLowerCase());
            if (characterSettingsDIV !== null) {
                for (let child of characterSettingsDIV.children) {
                    if (child.classList.contains('character-name') && child.value === characterSettingsDIV.getAttribute('id')) {
                        child.value = character.name;
                        child.checked = character.enabled;
                    }
                    else if (child.classList.contains('character-aliases')) {
                        child.value = character.aliases.join(", ");
                    }
                }
            }
        }
    });
}



//HELPER FUNCTIONS
//
//takes in a string of comma-separated troll handles
//returns an array of UPPERCASE handles
//on failure, returns a null
function prepareHandles(str) {
    var allTags = str.split(',');
    var results = [];
    for (let x = 0; x < allTags.length; x++) {
        var currentTag = allTags[x];
        currentTag = currentTag.trim();
        if (currentTag !== '') {
            //make sure that we only allow a-z, 0-9, and spaces in trolltag names
            if (/[^\w\s\d]/gi.test(currentTag) === false) {
                //note: tags are also always stored as allcaps
                results.push(currentTag.toUpperCase());
            }
            else {
                console.log("Tag error: " + currentTag);
            }
        }
    }
    return results;
}