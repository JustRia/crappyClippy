var saveButton = document.querySelector('button.save');
saveButton.addEventListener('click', save)
function save() {
    var targetWindow = null;
    var tabCount = 0;
    var storage = chrome.storage.local;
    alert("save");
    start();
    function start() {
        alert("start")
        //Returns calls getTabs(currentWindow) where current Window has a tabs property
        chrome.windows.getCurrent(true, getTabs);

    }
    function getTabs(win) {
        alert("getTabs")
        tabCount = win.tabs.length;
        for (var i = 0; i < tabCount; i++) {
            var tab = win.tab[i];
            storage.set({ 'title': tab.title }, { 'url': tab.url }, function () {
                alert(tab.title + 'saved')
            });
        }
    }
}