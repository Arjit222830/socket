const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
  console.log(message);
  $.ajax({
    url: '/message',
    headers: {
      id: identity
    },
    data: {
      text: message
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
});

//Message Submit

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.text.value;
  //Emit Message to server
  socket.emit('chatMessage', msg);
})