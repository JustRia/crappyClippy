listSets();
var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
  window.location.href = "../popup.html"
});

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function toggleSelected(e) {
  const li = e.target;
  li.classList.add("selected");
  open();
}

function listSets() {
  var ul = document.querySelector("div.setList");
  chrome.storage.sync.get(null, function callback(items) {
    console.log(items.data);
    if (items.data.length == 0 || items.data == null) {
      let div = createNode("div");
      div.setAttribute("class", "set");
      div.innerHTML = "No Sets Saved";
      append(ul, div);
      var button = document.querySelector("button.open");
      button.setAttribute("hidden", true);
    }
    items.data.map(function(set) {
      let div = createNode("div");
      div.setAttribute("class", "option set");
      div.innerHTML = set.name;
      div.addEventListener('click', function(e) {
        items.selectedSet = set;
        chrome.storage.sync.set(items, function() {
          console.log('Data successfully saved to the storage!');
        });
        toggleSelected(e);
        setTimeout(200);
      });
      append(ul, div);
    });
  })
}

function open() {
  var storage = chrome.storage.sync;
  storage.get(null, function(items) {
    var setToOpen = items.data.filter((e) => e.name === items.selectedSet.name)[0];
    var tabCount = setToOpen.tabs.length;
    for (var i = 0; i < tabCount; i++) {
      var tab = setToOpen.tabs[i];
      chrome.tabs.create({ url: tab.url });
    }
    setTimeout(backHome, 200);
  });

  function backHome() {
    window.location.href = "../popup.html"
  }
}