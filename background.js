chrome.runtime.onInstalled.addListener(function () {
    //runs when the extension is first installed only
    //Initialize these default settings for all characters, using JSON 
    const url = chrome.runtime.getURL('data/vastError.json');

    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((allCharactersJSON) => {
            console.log(allCharactersJSON);
            chrome.storage.sync.set({
                vastErrorSettings: allCharactersJSON
            }, function () {
                // Update status to let user know options were saved.
                console.log("HomeUnstuck v0.4 loaded");              
                   if (chrome.runtime.openOptionsPage) {
                    chrome.runtime.openOptionsPage();
                  } else {
                    window.open(chrome.runtime.getURL('options.html'));
                  } 
            });
        });

});

