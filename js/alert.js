var saveButton = document.querySelector('button.save');
saveButton.addEventListener('click', reminder);
var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
    window.location.href = "../popup.html"
});

function reminder() {
    var targetWindow = null;
    var tabCount = 0;
    start();

    function start() {
        const obj = {
            "populate": true
        };
        //Returns calls getTabs(currentWindow) where current Window has a tabs property
        chrome.windows.getCurrent(obj, setAlarms);
    }

    function setAlarms(win) {
        tabCount = win.tabs.length;
        period = document.querySelector("input#time").value;
        for (var i = 0; i < tabCount; i++) {
            var tab = win.tabs[i];
            /*const obj = {
                "periodInMinutes": period
            };*/
            chrome.alarms.create(tab.id.toString(), { "periodInMinutes": period });
            alert("Alarm set for: " + tab.id.toString() + "\nWith time: " + period + "min");
            sleep(200);
        }
        /*
        storage.set(set, function callback() {
            alert(set.tabs + " Saved");
        })*/

        //Saving sets to an array called data saved to local storage
        storage.get(null, function (items) {
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
            chrome.storage.local.set(items, function () {
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