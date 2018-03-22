var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
  window.location.href = "../popup.html"
});

listSets();

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
  e.target.appendChild(document.getElementById(data));
  saveOrder();
}

function saveOrder() {
  chrome.storage.local.get(null, function callback(items) {
    console.log(items.data);
    var setDivs = document.querySelector("div.setList").children;
    var newSetList = [];
    for (var i = 0; i < setDivs.length; i++) {
      var setDiv = setDivs[i];
      console.log(setDiv.id);
      for (var j = 0; j < items.data.length; j++) {
        if (setDiv.id == items.data[j].name) {
          newSetList.push(items.data[j]);
        }
      }
    }
    console.log(newSetList);
    items.data = newSetList;
    chrome.storage.local.set(items, function() {
      console.log('Data successfully saved to the storage!');
    });
  });
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
      //for drag: draggable="true" ondragstart="drag(event)"
      //for drop: ondrop="drop(event)" ondragover="allowDrop(event)"
      div.setAttribute("draggable", "true");
      //div.setAttribute("ondragstart", "drag(e)");
      //div.setAttribute("ondrop", "drop(e)");
      //div.setAttribute("ondragover", "allowDrop(e)");
      div.innerHTML = set.name;
      div.id = set.name;
      div.addEventListener('dragstart', (e) => drag(e));
      div.addEventListener('dragover', (e) => allowDrop(e));
      div.addEventListener('drop', (e) => drop(e));
      console.log(div);
      append(ul, div);
    });
  })
}