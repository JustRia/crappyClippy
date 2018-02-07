var saveButton = document.querySelector('div.save');
saveButton.addEventListener('click', saveRedirect);

function saveRedirect() {
  window.location.href = "../save.html"
}