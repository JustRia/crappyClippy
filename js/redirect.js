//At very beginning, remove selectedSet and editType from storage
chrome.storage.local.remove(["selectedSet", "editType"], function () {
  console.log('Removed selectedSet and editType from local storage');
});

var saveButton = document.querySelector('div.save');
var saveSelectButton = document.querySelector('div.select-save');
saveButton.addEventListener('click', saveRedirect);
saveSelectButton.addEventListener('click', selectSaveRedirect);

var openButton = document.querySelector('div.open');
openButton.addEventListener('click', openRedirect);
var openWindowButton = document.querySelector('div.open-window');
openWindowButton.addEventListener('click', openWindowRedirect);

var removeButton = document.querySelector('div.remove');
var editButton = document.querySelector('div.edit');
removeButton.addEventListener('click', removeRedirect);
editButton.addEventListener('click', editRedirect);

var alertButton = document.querySelector('div.alert');
alertButton.addEventListener('click', alertRedirect);

var orderButton = document.querySelector('div.order');
orderButton.addEventListener('click', orderRedirect);

var scheduleButton = document.querySelector('div.schedule');
scheduleButton.addEventListener('click', scheduleRedirect);

var sortButton = document.querySelector('div.sort');
sortButton.addEventListener('click', sortRedirect);

var separate = document.querySelector('div.separate');
separate.addEventListener('click', function () {
  chrome.windows.getCurrent(function (win) {
    chrome.tabs.getAllInWindow(win.id, function (tabs) {
      var tc = tabs.length;
      sort();
      function sort() {
        tabs.sort(function (a, b) {
          var urlA = a.url.toLowerCase();
          var urlB = b.url.toLowerCase();
          if (urlA < urlB) //sort string ascending
            return -1;
          if (urlA > urlB)
            return 1;
          return 0 //default return value (no sorting)
        });
      }
      var prev = tabs[0].url;
      var cur = null;
      var j = 0;
      var urls = [prev];
      for (var i = 1; i < tc; i++) {
        if (urls[0] == null) {
          urls[0] = prev;
        }
        cur = tabs[i].url;
        var curs = cur.split(".");
        var prevs = prev.split(".");
        if (curs[1] == prevs[1]) {
          j++;
          urls[j] = cur;
        } else {
          chrome.windows.create({ url: urls }, function () {

          });
          urls = [];
          j = 0;
        }
        prev = cur;
      }
      urls[j] = cur;
      chrome.windows.create({ url: urls }, function () {
      });
    });
    chrome.windows.remove(win.id, function () {

    });
  });
})

var surprise = document.querySelector('div.surprise');
surprise.addEventListener('click', function () {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

function saveRedirect() {
  window.location.href = "../save.html"
}

function openRedirect() {
  window.location.href = "../open.html"
}

function openWindowRedirect() {
  window.location.href = "../openWindow.html"
}

function editRedirect() {
  window.location.href = "../edit.html";
}

function removeRedirect() {
  window.location.href = "../remove.html"
}

function selectSaveRedirect() {
  window.location.href = "../selectSave.html"
}

function orderRedirect() {
  window.location.href = "../order.html"
}

function scheduleRedirect() {
  window.location.href = "../schedule.html"
}

function sortRedirect() {
  window.location.href = "../sort.html"
}

function alertRedirect() {
  window.location.href = "../alert.html"
}