listSets();
var removeButton = document.querySelector('button.remove');
removeButton.addEventListener('click', remove);
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
    li.classList.remove("selected");
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
      var button = document.querySelector("button.remove");
      button.setAttribute("hidden", true);
    }
    items.data.map(function(set) {
      let div = createNode("div");
      div.setAttribute("class", "option set");
      div.innerHTML = set.name;
      div.addEventListener('click', (e) => toggleSelected(e));
      //append(div, p);
      append(ul, div);
    });
  })
}

function remove() {
  var setCount = document.querySelector("div.setList").children.length;
  var storage = chrome.storage.local;
  storage.get(null, function(items) {
    if (Object.keys(items).length > 0 && items.data && items.data.length > 0) {
      var newData = items.data;
      var selected = 0;
      for (var i = 0; i < setCount; i++) {
        var element = document.querySelector("div.setList").children[i];
        if (element.classList.contains("selected")) {
          newData = newData.filter((e) => e.name == element.textContent);
          selected++;
        }
      }
      if (newData.length == 0 && selected == 0) {
        return;
      }
      items.data = newData;
    } else {
      setTimeout(backHome, 200);
    }
    // Now save the updated items using set
    chrome.storage.local.set(items, function() {
      console.log('Data successfully saved to the storage!');
    });

    setTimeout(backHome, 200);
  });

  function backHome() {
    window.location.href = "../popup.html"
  }
}