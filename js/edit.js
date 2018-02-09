var editType = 0;  //Type of edit to perform. 0, 1, 2 for name, add, remove
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
    chrome.storage.local.remove("selectedSet", function() {
      console.log('Removed selectedSet from local storage');
    });
    window.location.href = "../edit.html"
  });

  editName.addEventListener('click', function() {
    editType = 0;
    window.location.href = '../performEdits.html';
  });
  addTabs.addEventListener('click', function() {
    editType = 1;
    window.location.href = '../performEdits.html';
  });
  removeTabs.addEventListener('click', function() {
    editType = 2;
    window.location.href = '../performEdits.html';
  });
}
else {
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    window.location.href = "../editOptions.html"
  });
  if (editType == 0) {
    editSetName();
  }
  else if (editType == 1) {
    addToSet();
  }
  else {
    removeFromSet();
  }
}

function setSet(set) {
  selectedSet = set;
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
      setTimeout(200);
      window.location.href = '../popup.html';
    })
  });
}