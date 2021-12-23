const { Schema } = require('mongoose');
const shortId = require('./partials/short-id');

const ChatRoomSchema = new Schema({
  shortId,
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = ChatRoomSchema;
