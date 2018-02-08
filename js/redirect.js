var saveButton = document.querySelector('div.save');
var saveSelectButton = document.querySelector('div.select-save');
saveButton.addEventListener('click', saveRedirect);
saveSelectButton.addEventListener('click', selectSaveRedirect);

var removeButton = document.querySelector('div.remove');
removeButton.addEventListener('click', removeRedirect);

function saveRedirect() {
  window.location.href = "../save.html"
}


function removeRedirect() {
  window.location.href = "../remove.html"
}

function selectSaveRedirect() {
  window.location.href = "../selectSave.html"
}