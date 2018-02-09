var saveButton = document.querySelector('div.save');
var saveSelectButton = document.querySelector('div.select-save');
saveButton.addEventListener('click', saveRedirect);
saveSelectButton.addEventListener('click', selectSaveRedirect);

var removeButton = document.querySelector('div.remove');
var editButton = document.querySelector('div.edit');
removeButton.addEventListener('click', removeRedirect);
editButton.addEventListener('click', editRedirect);

var surprise = document.querySelector('div.surprise');
surprise.addEventListener('click', function() {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

function saveRedirect() {
  window.location.href = "../save.html"
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