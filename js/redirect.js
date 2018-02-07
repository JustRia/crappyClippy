var saveButton = document.querySelector('div.save');
var saveSelectButton = document.querySelector('div.select-save');
saveButton.addEventListener('click', saveRedirect);
saveSelectButton.addEventListener('click', selectSaveRedirect);

function saveRedirect() {
  window.location.href = "../save.html"
}

function selectSaveRedirect() {
  window.location.href = "../selectSave.html"
}