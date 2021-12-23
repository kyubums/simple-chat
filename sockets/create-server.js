const { Server } = require("socket.io");
const { parse } = require('cookie');
const { ChatRoom, Message } = require('../models');
const { formatMessage } = require('./utils');


module.exports = (server) => {
  const io = new Server(server, { credentials: true });

  async function sendPreviousMessages(socket, room) {
    const messages = await Message.find({ chatroom: room }).sort({ createdAt: 1 });
    socket.emit('messages', messages.map(({ sender, text }) => formatMessage(sender, text)));
  }

  io.on('connection', async (socket) => {
    // cookie
    const { name: escapedName } = parse(socket.request.headers.cookie);
    const name = unescape(escapedName);
    console.log('user connected', name);

    const roomShortId = socket.request.headers['room-short-id'];
    const room = await ChatRoom.findOne({ shortId: roomShortId });

    if (!room) {
      socket.emit('message', formatMessage('server', 'Invalid Room Id'));
      socket.disconnect();
    } else {
      socket.join(room.shortId);
      await sendPreviousMessages(socket, room);
      io.to(room.shortId).emit('message', formatMessage('server', `${name} 님이 입장했습니다.`));
    }

    socket.on('disconnect', () => {
      console.log('user disconnect', name);
    });

    socket.on('message', async (message) => {
      const sender = name;
      await Message.create({ chatroom: room, sender, text: message });
      io.to(roomShortId).emit('message', formatMessage(sender, message));
    });

    socket.on("connect_error", (err) => {
      socket.emit('message', formatMessage('server', err.message));
      socket.disconnect();
    });
  });
}
