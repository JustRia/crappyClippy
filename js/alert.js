var saveButton = document.querySelector('button.save');
saveButton.addEventListener('click', reminder);
var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
    window.location.href = "../popup.html"
});
var clearButton = document.querySelector('button.clear');
clearButton.addEventListener('click', function callback() {
    chrome.alarms.clearAll();
    console.log("All Alarms Cleared")
    setTimeout(backHome, 200);
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
        period = parseFloat(document.querySelector("input#time").value);
        chrome.alarms.clearAll();
        if (period == null) {
            return;
        }
        for (var i = 0; i < tabCount; i++) {
            var tab = win.tabs[i];
            chrome.alarms.create(tab.id.toString(), { "delayInMinutes": period, "periodInMinutes": period });
            console.log("Alarm set for: " + tab.id.toString() + "\nWith time: " + period + "min");
        }
        setTimeout(backHome, 200);
    }
}
function backHome() {
    window.location.href = "../popup.html"
}
