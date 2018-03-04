chrome.alarms.onAlarm.addListener(function (alarm) {
    chrome.tabs.get(parseInt(alarm.name), function (tab) {
        chrome.notifications.create(tab.id.toString(), {
            type: 'basic',
            iconUrl: '../img/crappyClippy_32x32.png',
            title: 'Do you need this tab',
            message: "This has been open for a while: " + tab.title,
        }, function (notificationId) {
            console.log(notificationId + " displayed");
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