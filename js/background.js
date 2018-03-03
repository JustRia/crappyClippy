chrome.tabs.onActivated.addListener(updateTimes);
chrome.tabs.onUpdated.addListener(updateTimes);
chrome.tabs.onHighlighted.addListener(updateTimes);
chrome.tabs.onRemoved.addListener(removeTime);

function updateTimes(tabId, changeInfo, tab){
  //tabId integer
  //changeInfo object
  //tab Tab
  chrome.storage.local.get(null, function(items) {
    var times = items.times;
    if (times == null) {
      times = {};
    }
    times[tabId] = Date.now();
    items.times = times;
    console.log(items);
    chrome.storage.local.set(items, function(){
      console.log("Times saved successfully");
    });
  });
  setTimeout(nothing, 200);
}

function removeTime(tabId, removeInfo){
  //tabId integer
  //removeInfo object
  chrome.storage.local.get(null, function(items) {
    var times = items.times;
    if (times == null) {
      times = {};
    }
    delete times[tabId];
    console.log(times);
    chrome.storage.local.set(items, function() {
      console.log("Time removed successfully");
    });
  });
  setTimeout(nothing, 200);
}

function nothing() {

}
