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
  
function toggleSelected(e) {
    const li = e.target;
    li.classList.add("selected");
    sOpen(document.getElementById("sTime").value);
    window.location.href = "../popup.html"
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
          chrome.storage.local.set(items, function() {
            console.log('Data successfully saved to the storage!');
          });
          toggleSelected(e);
          setTimeout(200);
        });
        append(ul, div);
      });
    })
}