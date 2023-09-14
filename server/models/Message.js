const { Schema, model, Types } = require('mongoose');

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDateTime,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
  },
  channel: {
    type: Types.ObjectId,
    ref: 'channel',
  },
});

function formatDateTime(date) {
  return `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
}

const Message = model('Message', messageSchema);

module.exports = Message;
