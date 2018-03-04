chrome.alarms.onAlarm.addListener(function (alarm) {
    chrome.tabs.get(parseInt(alarm.name), function (tab) {
        chrome.notifications.create(tab.id.toString(), {
            type: 'basic',
            iconUrl: '../img/crappyClippy_32x32.png',
            title: 'Consider closing this tab:',
            message: tab.title,
            requireInteraction: true,
        }, function (notificationId) {
            console.log(notificationId + " displayed");
            setTimeout(nothing, 200);
            return;

        });
    });

});
chrome.tabs.onRemoved.addListener(function (tab, removedInfo) {
    chrome.alarms.clear(tab.toString());
    console.log(tab + " alarm removed!");
});
chrome.tabs.onCreated.addListener(function (tab) {
    chrome.alarms.getAll(function (alarms) {
        if (alarms[0] != null) {
            var period = alarms[0].periodInMinutes;
            chrome.alarms.create(tab.id.toString(), { "delayInMinutes": period, "periodInMinutes": period });
            console.log("Alarm set for: " + tab.id.toString() + "\nWith time: " + period + "min");
        } else {
            console.log("No alarms set");
        }
    });
});

chrome.tabs.onActivated.addListener(updateTimes);
chrome.tabs.onUpdated.addListener(updateTimes);
chrome.tabs.onHighlighted.addListener(updateTimes);
chrome.tabs.onRemoved.addListener(removeTime);

function updateTimes(tabId, changeInfo, tab) {
    //tabId integer
    //changeInfo object
    //tab Tab
    chrome.storage.local.get(null, function (items) {
        var times = items.times;
        if (times == null) {
            times = {};
        }
        times[tabId] = Date.now();
        items.times = times;
        console.log(items);
        chrome.storage.local.set(items, function () {
            console.log("Times saved successfully");
        });
    });
    setTimeout(nothing, 200);
}

function removeTime(tabId, removeInfo) {
    //tabId integer
    //removeInfo object
    chrome.storage.local.get(null, function (items) {
        var times = items.times;
        if (times == null) {
            times = {};
        }
        delete times[tabId];
        console.log(times);
        chrome.storage.local.set(items, function () {
            console.log("Time removed successfully");
        });
    });
    setTimeout(nothing, 200);
}

function nothing() {

}
