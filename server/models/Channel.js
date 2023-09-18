const { Schema, model, Types } = require('mongoose');

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  public: {
    type: Boolean,
    default: true,
  },
  messages: [
    {
      type: Types.ObjectId,
      ref: 'Message',
    },
  ],
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Channel = model('Channel', channelSchema)

module.exports = Channel;
