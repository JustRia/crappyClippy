var saveButton = document.querySelector('button.save');
saveButton.addEventListener('click', save);
var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
  window.location.href = "../popup.html"
});
function save() {
    var targetWindow = null;
    var tabCount = 0;
    start();
    function start() {
        const obj = {
            "populate": true
        };
        //Returns calls getTabs(currentWindow) where current Window has a tabs property
        chrome.windows.getCurrent(obj, getTabs);

    }
    function getTabs(win) {
        var storage = chrome.storage.local;
        //window.open(chrome.extension.getURL("popup.html"), "gc-popout-window", "width=348,height=654")
        //var setName = window.prompt("Rename your tab set if you want", "My Tab Set");
        setName = document.querySelector("input#setName").value;
        if (setName == null) {
            return;
        }
        console.log(setName);
        var set = {
            "name": setName,
            "tabs": []
        };
        tabCount = win.tabs.length;
        for (var i = 0; i < tabCount; i++) {
            var tab = win.tabs[i];
            set.tabs.push(tab);
        }
        /*
        storage.set(set, function callback() {
            alert(set.tabs + " Saved");
        })*/

        //Saving sets to an array called data saved to local storage
        storage.get(null, function(items) {
            if (Object.keys(items).length > 0 && items.data) {
                // The data array already exists, add to it the new server and nickname
                items.data.push(set);
            } else {
              console.log("in here");
              // The data array doesn't exist yet, create it
              items.data = [set];
            }
            console.log(items);
            // Now save the updated items using set
            chrome.storage.local.set(items, function() {
              console.log('Data successfully saved to the storage!');
            });
        });

        //Wait before going back to popup.html or else data won't be saved.
        setTimeout(backHome, 200);
    }

    function backHome() {
      window.location.href = "../popup.html"
    }
}