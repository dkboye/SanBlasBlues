function updatecomment() {
// Check if there is already a value in local storage:
  if (localStorage.getItem(`store`)) {
// If so, update comment:
  document.getElementById(`comments`).innerHTML = localStorage.getItem(`store`)}
}
  
function toggleEdit() {
// get the textarea
var textarea = document.getElementById(`text`);
var comments = document.getElementById(`comments`);

// get the content of the textarea
var displaySetting = textarea.style.display;

// toggle the button/textarea depending on current state
if (displaySetting == 'block') {
  // textarea is visible -> hide it
  textarea.style.display = 'none';
  comments.style.display = 'block';
}
else {
  // textarea is hidden. show it
  if (localStorage.getItem(`store`)) {
    textarea.value = localStorage.getItem(`store`)}
    else {
      textarea.value = document.getElementById(`text`).innerHTML
    }
    textarea.style.display = 'block';
    comments.style.display = 'none';
  }
}

function edit_comments() {
// get text from textarea (id = "editpost_{{post.id}}"):
var text = document.getElementById(`text`).value;
var textarea = document.getElementById(`text`);
var comments = document.getElementById(`comments`);
// save "text" to local storage:
localStorage.setItem(`store`, text)
// edit post:
document.getElementById(`comments`).innerHTML = localStorage.getItem(`store`)
textarea.style.display = 'none';
comments.style.display = 'block';
}