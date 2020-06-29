const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const http = require('http');
const socketio = require('socket.io');
const users = require('./routes/users');
const messages = require('./routes/messages');
const { Message } = require('./models/message');
const { User } = require('./models/user');

const server = http.createServer(app);
const io = socketio(server);

require('./prod')(app);

mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${config.get('db')}...`))
    .catch(err => console.log(`Could not connect to ${config.get('db')}...`, err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', users);
app.use('/message', messages);

app.set('view engine', 'ejs');

io.on('connection', (socket) => {

    //Welcome current user
    socket.emit('message', 'Welcome to ChatChord');

    //Broadcast to all when a user connects

    socket.broadcast.emit('message', 'A user has joined the chat');

    //Runs when client disconnects

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    })
})

app.get('/', async function (req, res) {
    res.status(200).render('index');
});

app.get('/chat-:id', async function (req, res) {
    const logg = await User.findById(req.params.id);
    const messages = await Message.find().sort('date');
    res.status(200).render('chat', { messages: messages, id: req.params.id, logg: logg.name });
});

const port = process.env.PORT || 3000;
console.log(port);
const ser = server.listen(port, () => console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);
module.exports = ser;