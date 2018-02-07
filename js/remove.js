listSets();

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
    items.data.map(function (set) {
      console.log(set);
      let div = createNode("div");
      div.className += " option";
      div.innerHTML = set.name;
      append(ul, div);
    });
  })
}