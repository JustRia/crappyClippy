var selectedSet;
if (window.location.pathname === '/edit.html') {
  listSets();
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
    console.log(items.data);
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
        selectedSet = set;
        window.location.href = "../editOptions.html";
      });
      //append(div, p);
      append(ul, div);
    });
  })
}