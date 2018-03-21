cpu();

function cpu() {
    var ul = document.querySelector("div.cpuInfo");
    var currTabs;
    var currIDs;
    chrome.system.cpu.getInfo(function(info){
        
        let div1 = createNode("div");
        div1.innerHTML = ("Architecture: " + JSON.stringify(info.archName));


        let div = createNode("div");
        div.innerHTML = ("Processor: "+ JSON.stringify(info.modelName));
      
    });
   const obj = {
        populate: true
    }
    chrome.windows.getCurrent(obj, function(win) {
        currTabs = win.tabs;
        console.log(currTabs);
        for (var i = 0; i < currTabs.length; i++){
            chrome.processes.getProcessIdForTab(currTabs[i].id, function(tabGuys) {
                currIDs[i] = tabGuys.tabId;
            });
        }    
    });
    /*I don't have Chromium-- do you?*/
    let div = createNode("div1");
    chrome.processes.getProcessInfo(currIDs, true, function(tabStuff) {
        for (var i = 0; i < currIDs.length; i++) {
            div.innerHTML = (tabStuff);
        }
    });
    append(ul,div1); 

}