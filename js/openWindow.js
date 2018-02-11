listSets();
var openButton = document.querySelector('button.open');
openButton.addEventListener('click', open);
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
  if (li.classList.contains("selected")) {
    li.classList.open("selected");
  } else {
    li.classList.add("selected");
  }
}

function listSets() {
  var ul = document.querySelector("div.setList");
  chrome.storage.local.get(null, function callback(items) {
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
        toggleSelected(e);
        chrome.storage.local.set(items, function() {
          console.log('Data successfully saved to the storage!');
        });
        setTimeout(200);
      });
      append(ul, div);
    });
  })
}

function open() {
  var storage = chrome.storage.local;
  storage.get(null, function(items) {
    var setToOpen = items.data.filter((e) => e.name === items.selectedSet.name)[0];
    var tabCount = setToOpen.tabs.length;
    var newWid;
    var urls = [setToOpen.tabs[0].url];
    if(tabCount>1){
        for (var i = 1; i < tabCount; i++) {
            urls[i] = setToOpen.tabs[i].url;
        }
    }
    chrome.windows.create({url: urls}, function() {
        
    });
    
    setTimeout(backHome, 200);
  });

  function backHome() {
    window.location.href = "../popup.html"
  }
}