var saveButton = document.querySelector('div.save');
saveButton.addEventListener('click', save)
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
        window.open(chrome.extension.getURL("popup.html"), "gc-popout-window", "width=348,height=654")
        var setName = window.prompt("Rename your tab set if you want", "My Tab Set");
        if (setName == null) {
            return;
        }
        var set = {
            "name": setName,
            "tabs": []
        };
        tabCount = win.tabs.length;
        for (var i = 0; i < tabCount; i++) {
            var tab = win.tabs[i];
            set.tabs.push(tab);
        }
        storage.set(set, function callback() {
            alert(set.tabs + " Saved");
        })
    }
}