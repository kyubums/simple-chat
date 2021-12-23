const mongoose = require('mongoose');
const ChatRoomSchema = require('./schemas/chatroom');
const MessageSchema = require('./schemas/message');

exports.ChatRoom = mongoose.model('chatroom', ChatRoomSchema);
exports.Message = mongoose.model('message', MessageSchema)
