document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', () =>compose_email('','Subject: ', 'Body: '));
  
    // By default, load the inbox
    load_mailbox('inbox');
  });
  
  function compose_email(sender, subject, body) {
  
    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#content-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
  
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = sender;
    document.querySelector('#compose-subject').value = subject;
    document.querySelector('#compose-body').value = body;
    
    // Compose email
    document.querySelector('#emails-view-list').innerHTML = '';
    document.querySelector('#compose-form').onsubmit = () => {
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent')
    })
    // Catch any errors and log them to the console
    .catch(error => {
      console.log('Error:', error);
    });
    // Prevent default submission
    return false;
    };
  }
  
  function load_mailbox(mailbox) {
    
    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
    // Send GET request to emails/<mailbox>
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      document.querySelector('#emails-view-list').innerHTML = '';
    // Print emails to console
      console.log(emails);
    // Load mailbox and highlight emails that have been read
      emails.forEach((element) => {
        if(element.read === true && mailbox === "inbox") {
          document.querySelector('#emails-view-list').innerHTML +=
          `<div onclick="view(${element.id})" style="background: WhiteSmoke;padding: 5px; border-style: solid;border-width: 1px";>
            <span><b>${element.sender}</b>&nbsp&nbsp</span>
            <span class ="float-center">${element.subject}</span>
            <span class ="float-right">${element.timestamp}</span>
          </div>
          <button class="btn btn-info" onclick="archive(${element.id})">Archive</button>`
        }
        else if (mailbox ==="archive") {
          document.querySelector('#emails-view-list').innerHTML +=
          `<div onclick="view(${element.id})" style="padding: 5px; border-style: solid;border-width: 1px";>
            <span><b>${element.sender}</b>&nbsp&nbsp</span>
            <span class ="float-center">${element.subject}</span>
            <span class ="float-right">${element.timestamp}</span>
          </div>
          <button class="btn btn-info" onclick="unarchive(${element.id})">Unarchive</button>`
        }
        else {
        document.querySelector('#emails-view-list').innerHTML +=
        `<div onclick="view(${element.id})" style="padding: 5px; border-style: solid;border-width: 1px";>
          <span><b>${element.sender}</b>&nbsp&nbsp</span>
          <span class ="float-center">${element.subject}</span>
          <span class ="float-right">${element.timestamp}</span>
        </div>`
        }
        })
      })
    // Catch any errors and log them to the console
        .catch(error => {
          console.log('Error:', error)
        });
    // Prevent default submission
        return false;
      }
  
  function view(id) {
      fetch(`/emails/${id}`)
      .then(response => response.json())
      .then(email => {
    // Print email to console
        console.log(email);
    // Display email
    const element = document.createElement('div');
    element.innerHTML = `<b>From:&nbsp</b> ${email.sender} <br><b>To:&nbsp</b>${email.recipients} <br><b>Subject:&nbsp</b> ${email.subject}
    <br><b>Timestamp:&nbsp</b> ${email.timestamp}<hr>${email.body}<hr>`;
    const reply_button = document.createElement('div');
    const sub = email.subject;
    if (sub.startsWith("Re:")) {
      subject = sub.slice(3);
    }
    else {subject = email.subject}
    reply_button.innerHTML = `<button class="btn btn-primary" onclick="compose_email('${email.sender}','Re: ${subject}','On ${email.timestamp} ${email.sender} wrote: ${email.body}')">Reply</button>`;
    element.addEventListener('click', function() {
      console.log('Email replied to')
  });
      fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        read: true
        })
      })
      document.querySelector('#content-view').append(element);
      document.querySelector('#content-view').append(reply_button);
      document.querySelector('#content-view').style.display = 'block';
      document.querySelector('#emails-view-list').style.display = 'none';
      document.querySelector('#emails-view').style.display = 'none';
    });
    }
  
  function archive(id) {
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
      archived: true
      })
    })
    load_mailbox('inbox');
    };
  
  function unarchive(id) {
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
      archived: false
      })
    })
    load_mailbox('inbox');
    };