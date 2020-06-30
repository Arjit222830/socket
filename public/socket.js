const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

socket.on('message', message => {
  console.log(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


socket.on('messaging', message => {
  console.log(message);
  window.location.replace(`/chat-${identity}`);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message Submit

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.text.value;
  //Emit Message to server
  socket.emit('chatMessage', msg);

  e.target.elements.text.value = '';
  e.target.elements.text.focus();

  console.log(msg);

  $.ajax({
    url: '/message',
    headers: {
      id: identity
    },
    data: {
      text: msg
    },
    method: "POST",
    dataType: 'json',
    success: function (data) {
      $("#chat-messages").load(data.link);
    },
    error: function (err) {
      alert(JSON.stringify(err.responseText));
    }
  });

})