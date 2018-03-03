loadThree();

function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
function loadThree() {

  var ul = document.querySelector("div.tab-groups");
  chrome.storage.local.get(null, function callback(items) {
    if (items.data.length == 0 || items.data == null) {
      let div = createNode("div");
      div.setAttribute("class", "set");
      div.innerHTML = "No Sets To Open";
      append(ul, div);
    }
    /*if (items.data.length > 3) {
      items.data.length = 4;
    } */

    items.data.map(function(set) {
        let div = createNode("div");
        div.setAttribute("class", "option set");
        div.innerHTML = set.name;
        div.addEventListener('click', function() {
            chrome.storage.local.get(null, function(items) {
            var setToOpen = items.data.filter((e) => e.name === set.name)[0];
            var tabCount = setToOpen.tabs.length;
            for (var i = 0; i < tabCount; i++) {
              var tab = setToOpen.tabs[i];
              chrome.tabs.create({ url: tab.url });
            }  
          });
        });
        //append(div, p);
        append(ul, div);
    });
  })
}