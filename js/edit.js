if (window.location.pathname === '/edit.html') {
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    window.location.href = "../popup.html"
  });
  listSets();
}
else if (window.location.pathname === '/editOptions.html') {
  var editName = document.querySelector('div.rename');
  var addTabs = document.querySelector('div.add-tabs');
  var removeTabs = document.querySelector('div.remove-tabs');
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    chrome.storage.local.remove(["selectedSet", "editType"], function() {
      console.log('Removed selectedSet and editType from local storage');
    });
    window.location.href = "../edit.html"
  });

  editName.addEventListener('click', function() {
    chrome.storage.local.set({'editType': 0});
    window.location.href = '../performEdits.html';
  });
  addTabs.addEventListener('click', function() {
    chrome.storage.local.set({'editType': 1});
    window.location.href = '../performEdits.html';
  });
  removeTabs.addEventListener('click', function() {
    chrome.storage.local.set({'editType': 2});
    window.location.href = '../performEdits.html';
  });
}
else {
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    window.location.href = "../editOptions.html"
  });
  chrome.storage.local.get('editType', function (e) {
    if (e.editType == 0) {
      editSetName();
    }
    else if (e.editType == 1) {
      addToSet();
    }
    else {
      removeFromSet();
    }
  });
}

function toggleSelected(e) {
    const li = e.target;
    if (li.classList.contains("selected")) {
        li.classList.remove("selected");
    } else {
        li.classList.add("selected");
    }
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function listSets() {
  var ul = document.querySelector("div.setList");
  chrome.storage.local.get(null, function callback(items) {
    if (items.data.length == 0 || items.data == null) {
      let div = createNode("div");
      div.setAttribute("class", "set");
      div.innerHTML = "No Sets Saved";
      append(ul, div);
    }
    items.data.map(function (set) {
      let div = createNode("div");
      div.setAttribute("class", "option set");
      div.innerHTML = set.name;
      div.addEventListener('click', function() {
        items.selectedSet = set;
        chrome.storage.local.set(items, function() {
          console.log('Data successfully saved to the storage!');
        });
        setTimeout(200);
        window.location.href = "../editOptions.html";
      });
      //append(div, p);
      append(ul, div);
    });
  })
}

function editSetName() {
  var body = document.querySelector('body');
  var div = document.querySelector('div.fill');
  let input = createNode('input');
  input.setAttribute('id', 'setName');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'name');
  chrome.storage.local.get(null, function callback(items) {
    input.setAttribute('value', items.selectedSet.name);
    append(div, input);
  });
  let button = createNode('button');
  button.setAttribute('class', 'save');
  button.innerHTML = 'Save Changes';
  append(body, button);
  button.addEventListener('click', function() {
    chrome.storage.local.get(null, function(items) {
      var newData = items.data.filter((e) => e.name != items.selectedSet.name);
      items.selectedSet.name = input.value;
      newData.push(items.selectedSet);
      items.data = newData;
      chrome.storage.local.set(items, function () {
          console.log('Data successfully saved to the storage!');
      });
      chrome.storage.local.remove("selectedSet", function() {
        console.log('Removed selectedSet from local storage');
      });
      window.location.href = '../popup.html';
    })
  });
}

function addToSet() {
  var div = document.querySelector('div.fill');
   div.className += ' tabList';
  chrome.windows.getCurrent({'populate': true}, function(win) {
    tabCount = win.tabs.length;
    var tabList = document.querySelector(".tabList");
    for (var i = 0; i < tabCount; i++) {
      var tab = win.tabs[i];
      var li = document.createElement("li");
      li.setAttribute("class", "tab");
      li.setAttribute("url", tab.url);
      li.setAttribute("id", tab.id);
      li.appendChild(document.createTextNode(tab.title));
      li.addEventListener('click', (e) => toggleSelected(e))
      div.appendChild(li);
    }
    let button = createNode('button');
    button.setAttribute('class', 'save');
    button.innerHTML = 'Save Changes';
    append(div, button);
    button.addEventListener('click', function() {
      console.log(document.querySelector('div.fill').children);
      var childCount = document.querySelector('div.fill').children.length;
      chrome.storage.local.get(null, function(items) {
        var setToEdit = items.data.filter((e) => e.name === items.selectedSet.name)[0];
        var child;
        for (var i = 0; i < childCount; i++) {
          child = document.querySelector('div.tabList').children[i];
          if (child.classList.contains("selected")) {
            var tab = {
              "title": child.textContent,
              "url": child.getAttribute("url")
            };
            setToEdit.tabs.push(tab);
          }
        }
        console.log(setToEdit);
        var index = items.data.findIndex((e) => e.name === setToEdit.name);
        items.data[index] = setToEdit;
        chrome.storage.local.set(items, function () {
          console.log('Data successfully saved to the storage!');
        });
        chrome.storage.local.remove(["selectedSet", "editType"], function() {
          console.log('Removed selectedSet and editType from local storage');
        });
        window.location.href = '../popup.html';
      });
    });
  });
}