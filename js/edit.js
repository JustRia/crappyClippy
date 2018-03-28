if (window.location.pathname === '/edit.html') {
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    window.location.href = "../popup.html"
  });
  listSets();
} else if (window.location.pathname === '/editOptions.html') {
  var editName = document.querySelector('div.rename');
  var addTabs = document.querySelector('div.add-tabs');
  var removeTabs = document.querySelector('div.remove-tabs');
  var orderTabs = document.querySelector('div.order-tabs');
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    chrome.storage.local.remove(["selectedSet", "editType"], function() {
      console.log('Removed selectedSet and editType from local storage');
    });
    window.location.href = "../edit.html"
  });

  editName.addEventListener('click', function() {
    chrome.storage.local.set({
      'editType': 0
    });
    window.location.href = '../performEdits.html';
  });
  addTabs.addEventListener('click', function() {
    chrome.storage.local.set({
      'editType': 1
    });
    window.location.href = '../performEdits.html';
  });
  removeTabs.addEventListener('click', function() {
    chrome.storage.local.set({
      'editType': 2
    });
    window.location.href = '../performEdits.html';
  });
  orderTabs.addEventListener('click', function() {
    chrome.storage.local.set({
      'editType': 3
    });
    window.location.href = '../performEdits.html';
  });

} else {
  var backButton = document.querySelector('div.home');
  backButton.addEventListener('click', function callback() {
    window.location.href = "../editOptions.html"
  });
  chrome.storage.local.get('editType', function(e) {
    if (e.editType == 0) {
      editSetName();
    } else if (e.editType == 1) {
      addToSet();
    } else  if (e.editType == 2) {
      removeFromSet();
    } else {
      orderSets();
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
    items.data.map(function(set) {
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
      items.selectedSet.name = input.value;
      items.data.push(items.selectedSet);
      chrome.storage.local.set(items, function() {
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
  chrome.windows.getCurrent({
    'populate': true
  }, function(win) {
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
    let allButton = createNode('button');
    allButton.setAttribute('class', 'save');
    allButton.innerHTML = 'Add all';
    append(div, allButton);
    allButton.addEventListener('click', function() {
      console.log(document.querySelector('div.fill').children);
      var childCount = document.querySelector('div.fill').children.length;
      chrome.storage.local.get(null, function(items) {
        var setToEdit = items.data.filter((e) => e.name === items.selectedSet.name)[0];
        var child;
        for (var i = 0; i < childCount; i++) {
          child = document.querySelector('div.tabList').children[i];
          console.log(child);
          if (child.tagName == 'LI') {
            var tab = {
              "title": child.textContent,
              "url": child.getAttribute("url")
            };
            setToEdit.tabs.push(tab);
          }
        }
        items.data.push(setToEdit);
        chrome.storage.local.set(items, function() {
          console.log('Data successfully saved to the storage!');
        });
        chrome.storage.local.remove(["selectedSet", "editType"], function() {
          console.log('Removed selectedSet and editType from local storage');
        });
        window.location.href = '../popup.html';
      });
    });
    button.addEventListener('click', function() {
      console.log(document.querySelector('div.fill').children);
      var childCount = document.querySelector('div.fill').children.length;
      chrome.storage.local.get(null, function(items) {
        var setToEdit = items.data.filter((e) => e.name === items.selectedSet.name)[0];
        var child;
        for (var i = 0; i < childCount; i++) {
          child = document.querySelector('div.tabList').children[i];
          if (child.tagName == 'LI') {
            var tab = {
              "title": child.textContent,
              "url": child.getAttribute("url")
            };
            setToEdit.tabs.push(tab);
          }
        }
        items.data.push(setToEdit);
        chrome.storage.local.set(items, function() {
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

function removeFromSet() {
  var div = document.querySelector('div.fill');
  div.className += ' tabList';
  chrome.storage.local.get(null, function(items) {
    var setToEdit = items.data.filter((e) => e.name === items.selectedSet.name)[0];
    tabCount = setToEdit.tabs.length;
    for (var i = 0; i < tabCount; i++) {
      var tab = setToEdit.tabs[i];
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
      var childCount = document.querySelector('div.fill').children.length;
      var child;
      for (var i = 0; i < childCount; i++) {
        child = document.querySelector('div.tabList').children[i];
        if (!child.classList.contains("selected")) {
          setToEdit.tabs = setToEdit.tabs.filter((e) => e.title !== child.innerHTML);
        }
      }
      if (setToEdit.tabs.length == 0) {
        items.data = items.data.filter((e) => e.name !== setToEdit.name);
        console.log(items.data);
      } else {
        items.data.push(setToEdit);
      }
      chrome.storage.local.set(items, function() {
        console.log('Data successfully saved to the storage!');
      });
      chrome.storage.local.remove(["selectedSet", "editType"], function() {
        console.log('Removed selectedSet and editType from local storage');
      });
      window.location.href = '../popup.html';
    });
  });
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  console.log(data);
  console.log(e.target);
  e.target.parentNode.insertBefore(document.getElementById(data), e.target.nextSibling);
}

function orderSets() {
  var div = document.querySelector('div.fill');
  div.className += ' tabList';
  chrome.storage.local.get(null, function(items) {
    var setToEdit = items.data.filter((e) => e.name === items.selectedSet.name)[0];
    tabCount = setToEdit.tabs.length;
    for (var i = 0; i < tabCount; i++) {
      var tab = setToEdit.tabs[i];
      var li = document.createElement("li");
      li.setAttribute("class", "tab");
      li.setAttribute("url", tab.url);
      li.setAttribute("id", tab.id);
      li.setAttribute("title", tab.title);
      li.setAttribute("draggable", "true");
      li.addEventListener('dragstart', (e) => drag(e));
      li.addEventListener('dragover', (e) => allowDrop(e));
      li.addEventListener('drop', (e) => drop(e));
      li.appendChild(document.createTextNode(tab.title));
      div.appendChild(li);
    }
    let button = createNode('button');
    button.setAttribute('class', 'save');
    button.innerHTML = 'Save Changes';
    append(div, button);
    button.addEventListener('click', function() {
      chrome.storage.local.get(null, function callback(items) {
        console.log(items.data);
        var tabLis = document.querySelector("div.tabList").children;
        var newTabList = [];
        for (var i = 0; i < tabLis.length; i++) {
          var tabLi = tabLis[i];
          console.log(tabLi.id);
          var tab = {
            title: tabLi.title,
            url: tabLi.url,
            id: tabLi.id
          }
          newTabList.push(tab);
        }
        var index = items.data.findIndex((e) => e.name === setToEdit.name);
        items.data[index].tabs = newTabList;
        chrome.storage.local.set(items, function() {
          console.log('Data successfully saved to the storage!');
        });
      });
      chrome.storage.local.remove(["selectedSet", "editType"], function() {
        console.log('Removed selectedSet and editType from local storage');
      });
      window.location.href = '../popup.html'
    });
  });
}