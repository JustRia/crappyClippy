var saveButton = document.querySelector('div.save');
saveButton.addEventListener('click', saveRedirect);

var removeButton = document.querySelector('div.remove');
removeButton.addEventListener('click', removeRedirect);

function saveRedirect() {
  window.location.href = "../save.html"
}

function removeRedirect() {
  window.location.href = "../remove.html"
}