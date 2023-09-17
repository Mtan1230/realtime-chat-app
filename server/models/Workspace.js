const { Schema, model, Types } = require('mongoose');

const channelSchema = require('./Channel');

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  channels: [channelSchema],
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Workspace = model('Workspace', workspaceSchema);

module.exports = Workspace;
