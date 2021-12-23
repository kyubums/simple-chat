const { Schema } = require('mongoose');

const MessageSchema = new Schema({
  chatroom: {
    type: Schema.Types.ObjectId,
    ref: 'chatroom',
  },
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = MessageSchema;
