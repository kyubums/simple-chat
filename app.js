const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cookieParser = require('cookie-parser');
const createSocketServer = require('./sockets/create-server');

const chatsRouter = require('./routes/chats');

mongoose.connect('mongodb://localhost:27017/simple-chat');

const app = express();
const server = http.createServer(app);
createSocketServer(server);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.render('main');
});

app.use('/chats', chatsRouter);

server.listen(3000, () => {
  console.log('STARTED');
});
