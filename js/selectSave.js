var saveButton = document.querySelector('button.save');
saveButton.addEventListener('click', save);
var backButton = document.querySelector('div.home');
backButton.addEventListener('click', function callback() {
  window.location.href = "../popup.html"
});

populateTabs();

function populateTabs() {
  var targetWindow = null;
  var tabCount = 0;
  start();

  function start() {
    const obj = {
      "populate": true
    };
    //Returns calls getTabs(currentWindow) where current Window has a tabs property
    chrome.windows.getCurrent(obj, getTabs);

  }

  function getTabs(win) {
    var storage = chrome.storage.local;
    //window.open(chrome.extension.getURL("popup.html"), "gc-popout-window", "width=348,height=654")
    //var setName = window.prompt("Rename your tab set if you want", "My Tab Set");
    setName = document.querySelector("input#setName").value;
    console.log(setName);
    var set = {
        "name": setName,
        "tabs": []
    };
    tabCount = win.tabs.length;
    var tabList = document.querySelector(".tabList");
    for (var i = 0; i < tabCount; i++) {
    	var tab = win.tabs[i];
      var li = document.createElement("li");
      li.setAttribute("class", "tab");
      li.setAttribute("url", tab.url);
      li.setAttribute("id", tab.id);
      var img = document.createElement("img");
      img.setAttribute("src", tab.favIconUrl);
      img.setAttribute("height", "16");
      li.appendChild(img);
      li.appendChild(document.createTextNode(tab.title));
      li.addEventListener('click', (e) => toggleSelected(e))
      tabList.appendChild(li);
    }
    console.log(set);
  }
}

function toggleSelected(e) {
  const li = e.target;
  if (li.classList.contains("selected")) {
    li.classList.remove("selected");
  } else {
    li.classList.add("selected");
  }
}

function save() {
  var tabCount = 0;
  getTabs();

  function getTabs() {
    var storage = chrome.storage.local;
    //window.open(chrome.extension.getURL("popup.html"), "gc-popout-window", "width=348,height=654")
    //var setName = window.prompt("Rename your tab set if you want", "My Tab Set");
    setName = document.querySelector("input#setName").value;
    if (setName == "") {
      if (document.querySelector('div.error') == null) {
        var div = document.createElement('div');
        div.setAttribute("class", "error");
        div.innerHTML = "Please input a name for your set";
        document.querySelector("div.content").appendChild(div);
      }
      return;
    }
    console.log(setName);
    var set = {
      "name": setName,
      "tabs": []
    };
    tabCount = document.getElementById("tabList").children.length;
    var child;
    for (var i = 0; i < tabCount; i++) {
      child = document.getElementById("tabList").children[i];
      if (child.classList.contains("selected")) {
        var tab = {
          "title": child.textContent,
          "url": child.getAttribute("url")
        };
        set.tabs.push(tab);
      }
    }
    /*
    storage.set(set, function callback() {
        alert(set.tabs + " Saved");
    })*/

    //Saving sets to an array called data saved to local storage
    storage.get(null, function(items) {
      if (Object.keys(items).length > 0 && items.data) {
        // The data array already exists, add to it the new server and nickname
        var found = false;
        for(var i = 0; i < items.data.length; i++) {
          if (items.data[i].name == set.name) {
            console.log("Found Duplicate");
            found = true;
            break;
          }
        }
        if (!found) {
          items.data.push(set);
        }
        else {
          if (document.querySelector('div.exists-error') == null) {
            var div = document.createElement('div');
            div.setAttribute("class", "exists-error");
            div.innerHTML = "\nA saved set already has this name. Change it pls.";
            document.querySelector("div.content").appendChild(div);
          }
          return;
        }
      } else {
        console.log("in here");
        // The data array doesn't exist yet, create it
        items.data = [set];
      }
      console.log(items);
      // Now save the updated items using set
      chrome.storage.local.set(items, function() {
        console.log('Data successfully saved to the storage!');
      });
      //Wait before going back to popup.html or else data won't be saved.
      setTimeout(backHome, 200);
    });
  }

  function backHome() {
    window.location.href = "../popup.html"
  }
}