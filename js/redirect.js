//At very beginning, remove selectedSet and editType from storage
chrome.storage.local.remove(["selectedSet", "editType"], function () {
  console.log('Removed selectedSet and editType from local storage');
});

var saveButton = document.querySelector('div.save');
var saveSelectButton = document.querySelector('div.select-save');
saveButton.addEventListener('click', saveRedirect);
saveSelectButton.addEventListener('click', selectSaveRedirect);

var openButton = document.querySelector('div.open');
openButton.addEventListener('click', openRedirect);
var openWindowButton = document.querySelector('div.open-window');
openWindowButton.addEventListener('click', openWindowRedirect);

var removeButton = document.querySelector('div.remove');
var editButton = document.querySelector('div.edit');
removeButton.addEventListener('click', removeRedirect);
editButton.addEventListener('click', editRedirect);

var alertButton = document.querySelector('div.alert');
alertButton.addEventListener('click', alertRedirect);

var orderButton = document.querySelector('div.order');
orderButton.addEventListener('click', orderRedirect);

var surprise = document.querySelector('div.surprise');
surprise.addEventListener('click', function () {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

function saveRedirect() {
  window.location.href = "../save.html"
}

function openRedirect() {
  window.location.href = "../open.html"
}

function openWindowRedirect() {
  window.location.href = "../openWindow.html"
}

function editRedirect() {
  window.location.href = "../edit.html";
}

function removeRedirect() {
  window.location.href = "../remove.html"
}

function selectSaveRedirect() {
  window.location.href = "../selectSave.html"
}

function orderRedirect() {
  window.location.href = "../order.html"
}

function alertRedirect() {
  window.location.href = "../alert.html"
}