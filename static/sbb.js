function updatecomment(){
// Check if there is already a value in local storage:
  if (localStorage.getItem(`store`)) {
// If so, update comment:
  document.getElementById(`comments`).innerHTML = localStorage.getItem(`store`)}
  }

// function update_datepaid(invoice_no){
// // Check if there is already a value in local storage:
//   if (localStorage.getItem(`stored_${invoice_no}`)) {
// // If so, update comment:
//   document.getElementById(`notyet_${invoice_no}`).innerHTML = localStorage.getItem(`stored_${invoice_no}`)}
//   }

function job_description(invoice_no) {
// Check if there is already a value in local storage:
  if (localStorage.getItem(`job_${invoice_no}`)) {
// If so, update job description:
  document.getElementById(`job_${invoice_no}`).innerHTML = localStorage.getItem(`job_${invoice_no}`)}
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

function datepaid(invoice_no) {
  // get text from textarea (id = "editpost_{{post.id}}"):
  var text = document.getElementById(`datepaid_${invoice_no}`).value;
  var textarea = document.getElementById(`datepaid_${invoice_no}`);
  var comments = document.getElementById(`notyet_${invoice_no}`);
  // save "text" to local storage:
  localStorage.setItem(`stored_${invoice_no}`, text)
  // edit post:
  document.getElementById(`notyet_${invoice_no}`).innerHTML = localStorage.getItem(`stored_${invoice_no}`)
  textarea.style.display = 'none';
  comments.style.display = 'block';
  }

function edit_job_description(invoice_no) {
  // get text from textarea (id = "editpost_{{post.id}}"):
  var text = document.getElementById(`jobtext_${invoice_no}`).value;
  var textarea = document.getElementById(`jobtext_${invoice_no}`);
  var comments = document.getElementById(`job_${invoice_no}`);
  // save "text" to local storage:
  localStorage.setItem(`job_${invoice_no}`, text)
  // edit post:
  document.getElementById(`job_${invoice_no}`).innerHTML = localStorage.getItem(`job_${invoice_no}`)
  textarea.style.display = 'none';
  comments.style.display = 'block';
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

function toggleDatepaid(invoice_no) {
// get the textarea
  var textarea = document.getElementById(`datepaid_${invoice_no}`);
  var comments = document.getElementById(`notyet_${invoice_no}`);

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
    if (localStorage.getItem(`stored_${invoice_no}`)) {
      textarea.value = localStorage.getItem(`stored_${invoice_no}`)}
    else {
      textarea.value = document.getElementById(`notyet_${invoice_no}`).innerHTML
    }
    textarea.style.display = 'block';
    comments.style.display = 'none';
    }
  }

function toggleJobDescription(invoice_no) {
// get the textarea
  var textarea = document.getElementById(`jobtext_${invoice_no}`);
  var comments = document.getElementById(`job_${invoice_no}`);

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
    if (localStorage.getItem(`job_${invoice_no}`)) {
      textarea.value = localStorage.getItem(`job_${invoice_no}`)}
    else {
      textarea.value = document.getElementById(`job_${invoice_no}`).innerHTML
    }
    textarea.style.display = 'block';
    comments.style.display = 'none';
    }
  }

  function addhrs(id) {
      fetch(`/modhrs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        hrs: 1
        })
      })
      console.log("Hrs added")
    setTimeout(function F() {
    fetch(`/modhrs/${id}`)
    .then(response => response.json())
    .then(post => {
      console.log(post);
      localStorage.setItem(`hrs_${id}`, `${post.hrs}`);
      document.querySelector(`#hrs_${id}`).innerHTML = localStorage.getItem(`hrs_${id}`);
      location.reload()
    })
  }, 50)
  }

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("totals_table_all_entries");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first and second, which contains table headers and totals): */
    for (i = 2; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  }

function sortTotals(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("totals_table_all_entries");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first and second, which contains table headers and totals): */
    for (i = 2; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML) > (Number(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < (Number(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  }

function sortMonthlyTotals(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("monthly_totals");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first and second, which contains table headers and totals): */
    for (i = 2; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML) > (Number(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < (Number(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  }

function sortDates(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("totals_table_all_entries");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first and second, which contains table headers and totals): */
    for (i = 2; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Date(x.innerHTML) > (Date(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Date(x.innerHTML) < (Date(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  }

function editSender(name){
  // get text from textarea (id = "editsender_{{name}}"):
  var address = document.getElementById(`sendertext_${name}`).value;
  // save "address" to local storage:
  localStorage.setItem(`address_${name}`, address)
  // edit sender:
  document.querySelector(`#sender_${name}`).innerHTML = localStorage.getItem(`address_${name}`)
  }

function toggleSender(name) {
// get the textarea
  var textarea = document.getElementById(`sendertext_${name}`);
  var address = document.getElementById(`sender_${name}`);

  // get the content of the textarea
  var displaySetting = textarea.style.display;

  // toggle the button/textarea depending on current state
  if (displaySetting == 'block') {
  // textarea is visible -> hide it
    textarea.style.display = 'none';
    address.style.display = 'block';
  }
  else {
  // textarea is hidden. show it
    if (localStorage.getItem(`sender_${name}`)) {
      textarea.value = localStorage.getItem(`sender_${name}`)}
    else {
      textarea.value = document.getElementById(`sender_${name}`).innerHTML
    }
    textarea.style.display = 'block';
    address.style.display = 'none';
    }
  }

function updateSender(name) {
  // Check if there is already a value in local storage:
    if (localStorage.getItem(`address_${name}`)) {
  // If so, update post:
    document.querySelector(`#sender_${name}`).innerHTML = localStorage.getItem(`address_${name}`)}
  }

function editClient(name) {
  // get text from textarea (id = "editsender_{{name}}"):
  var client = document.getElementById(`clienttext_${name}`).value;
  // save "client" to local storage:
  localStorage.setItem(`client_${name}`, client)
  // edit client:
  document.querySelector(`#client_${name}`).innerHTML = localStorage.getItem(`client_${name}`)
  }

function toggleClient(name) {
// get the textarea
  var textarea = document.getElementById(`clienttext_${name}`);
  var client = document.getElementById(`client_${name}`);

  // get the content of the textarea
  var displaySetting = textarea.style.display;

  // toggle the button/textarea depending on current state
  if (displaySetting == 'block') {
  // textarea is visible -> hide it
    textarea.style.display = 'none';
    client.style.display = 'block';
  }
  else {
  // textarea is hidden. show it
    if (localStorage.getItem(`client_${name}`)) {
      textarea.value = localStorage.getItem(`client_${name}`)}
    else {
      textarea.value = document.getElementById(`client_${name}`).innerHTML
    }
    textarea.style.display = 'block';
    client.style.display = 'none';
    }
  }

function updateClient(name) {
  // Check if there is already a value in local storage:
    if (localStorage.getItem(`client_${name}`)) {
  // If so, update post:
    document.querySelector(`#client_${name}`).innerHTML = localStorage.getItem(`client_${name}`)}
  }

function sortClientTable(n) {
var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
table = document.getElementById("totals_table_medium");
switching = true;
// Set the sorting direction to ascending:
dir = "asc";
/* Make a loop that will continue until
no switching has been done: */
while (switching) {
  // Start by saying: no switching is done:
  switching = false;
  rows = table.rows;
  /* Loop through all table rows (except the
  first and second, which contains table headers and totals): */
  for (i = 2; i < (rows.length - 1); i++) {
    // Start by saying there should be no switching:
    shouldSwitch = false;
    /* Get the two elements you want to compare,
    one from current row and one from the next: */
    x = rows[i].getElementsByTagName("td")[n];
    y = rows[i + 1].getElementsByTagName("td")[n];
    /* Check if the two rows should switch place,
    based on the direction, asc or desc: */
    if (dir == "asc") {
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    } else if (dir == "desc") {
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
  }
  if (shouldSwitch) {
    /* If a switch has been marked, make the switch
    and mark that a switch has been done: */
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
    // Each time a switch is done, increase this count by 1:
    switchcount ++;
  } else {
    /* If no switching has been done AND the direction is "asc",
    set the direction to "desc" and run the while loop again. */
    if (switchcount == 0 && dir == "asc") {
      dir = "desc";
      switching = true;
    }
  }
}
  }

function sortClientTotals(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("totals_table_medium");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first and second, which contains table headers and totals): */
    for (i = 2; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML) > (Number(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < (Number(y.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  }

function Payload(invoice_no, invoice_date) {
  const user_id = JSON.parse(document.getElementById('user_id').textContent);
  if (localStorage.getItem(`paid_${invoice_no}_${user_id}`) == "paid") {
    // If so, update text:
      // document.getElementById(`text`).innerHTML = localStorage.getItem(`paid_${invoice_no}`);
      var text = document.getElementById("text");
      var notext = document.getElementById("notext");
      notext.style.display = "none";
      text.style.display = "block";
    }
  }

function Paid(invoice_no) {
  const user_id = JSON.parse(document.getElementById('user_id').textContent);
  var text = document.getElementById("text");
  var notext = document.getElementById("notext");
  // Check if there is already a value in local storage:
  if (localStorage.getItem(`paid_${invoice_no}_${user_id}`) == "paid") {
    text.style.display = "none";
    notext.style.display = "block";
    localStorage.setItem(`paid_${invoice_no}_${user_id}`, "unpaid");
  }
  else{
    text.style.display = "block";
    notext.style.display = "none"
    localStorage.setItem(`paid_${invoice_no}_${user_id}`, "paid");
    }
  }