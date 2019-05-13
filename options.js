// Saves options to chrome.storage

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
            if (/[a-z0-9\s]/gi.test(currentTag) === false || /[\W|_]/g.test(currentTag)===true) {
                return null;
            }
            results.push(currentTag);
        }
    }
    return results;
}

function save_options() {
    var dismas = document.getElementById('dismas').checked;
    var murrit = document.getElementById('murrit').checked;
    var murritAliases = document.getElementById('murrit-aliases').value;
    var dismasAliases = document.getElementById('dismas-aliases').value;

    var characterSettings = document.getElementsByClassName('characterSettings');
    for(let i = 0; i < characterSettings.length; i++) {
        //iterate through the children looking for the two we want
        let children = characterSettings[i].children; 
        for(let j = 0; j < children.length; j++) {
            if(children[j].nodeName==='INPUT') {
                console.log(children[j]);
            }
        }
    }

   /*  characterSettings.forEach(function(character) {
        console.log(character);
    }); */

    //grab all the character settings
    
/*         chrome.storage.sync.set({
          dismas: dismas,
          murrit: murrit
        }, function() {
          // Update status to let user know options were saved.
          var status = document.getElementById('status');
          status.textContent = 'Options saved.';
          setTimeout(function() {
            status.textContent = '';
          }, 2000);
        });  */ 
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    /*    chrome.storage.sync.get({
           dismas: dismas,
           murrit: murrit
       }, function(items) {
         document.getElementById('dismas').checked = items.dismas;
         document.getElementById('murrit').checked = items.murrit;
       }); */
}

//LISTENERS
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);