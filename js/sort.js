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
        delete times[tabsSorted[i]];
      }
    }
    items.times = times;
    chrome.storage.local.set(items, null);
  });
  setTimeout(nothing, 200);
}

function nothing() {

}