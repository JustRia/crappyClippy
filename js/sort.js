var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
  window.location.href = "../popup.html"
});

var sortByTimeButton = document.querySelector(".by-time");
sortByTimeButton.addEventListener('click', sortByTimeUpdated);

function sortByTimeUpdated() {
  chrome.storage.local.get(null, function(items) {
    var times = items.times;
    var tabsSorted = Object.keys(times).sort(function(a,b){return times[a]-times[b]});
    console.log(tabsSorted);
    for (var i in tabsSorted) {
      console.log(tabsSorted[i]);
      try {
        chrome.tabs.move(parseInt(tabsSorted[i]), {index: -1}, null);
      } catch (error) {
        console.log(error);
        console.log("Deleting " + tabsSorted[i]);
        delete tabsSorted[i];
      }
    }
    items.times = times;
    chrome.storage.local.set(items, null);
  });
  setTimeout(nothing, 200);
}

function nothing() {}

var type;
var nameSort = document.querySelector('div.by-name');
nameSort.addEventListener('click', function() {
  type = 0;
  sort();
});
var domainSort = document.querySelector('div.by-domain');
domainSort.addEventListener('click', function() {
  type = 1;
  sort();
});

function sort() {
  var targetWindow = null;
  var tabCount = 0;

  const obj = {
    "populate": true
  };
  //Returns calls getTabs(currentWindow) where current Window has a tabs property
  chrome.windows.getCurrent(obj, function(win) {
    tabCount = win.tabs.length;
    if (type == 0) { //Sort by name
      win.tabs.sort(function(a, b) {
        var nameA = a.title.toLowerCase();
        var nameB = b.title.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0 //default return value (no sorting)
      });
    } else {
      win.tabs.sort(function(a, b) {
        var urlA = a.url.toLowerCase();
        var urlB = b.url.toLowerCase();
        if (domainA < domainB) //sort string ascending
          return -1;
        if (domainA > domainB)
          return 1;
        return 0 //default return value (no sorting)
      });
    }
    for (var i = 0; i < tabCount; i++) {
      win.tabs[i].index = i;
      chrome.tabs.move(win.tabs[i].id, {
        index: i
      });
    }
  });
}