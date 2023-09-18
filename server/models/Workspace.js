const { Schema, model, Types } = require('mongoose');

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  channels: [
    {
      type: Types.ObjectId,
      ref: 'Channel',
    },
  ],
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Workspace = model('Workspace', workspaceSchema);

module.exports = Workspace;
