var saveButton = document.querySelector('div.save');
saveButton.addEventListener('click', save)
function save() {
    var targetWindow = null;
    var tabCount = 0;
    alert("save");
    start();
    function start() {
        alert("start");
        const obj = {
          "populate": true
        };
        //Returns calls getTabs(currentWindow) where current Window has a tabs property
        chrome.windows.getCurrent(obj, getTabs);

    }
    function getTabs(win) {
        var storage = chrome.storage.local;
        alert("getTabs");
        tabCount = win.tabs.length;
        console.log(win.tabs.length);
        for (var i = 0; i < tabCount; i++) {
            var tab = win.tabs[i];
            storage.set({ 'title': tab.title, 'url': tab.url }, function () {
                alert(tab.title + 'saved')
            });
        }
    }
}