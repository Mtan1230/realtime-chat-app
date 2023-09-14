const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: String,
  image: String,
  googleId: String,
  workspaces: [
    {
      type: Types.ObjectId,
      ref: 'Workspace',
    },
  ],
});

const User = model('User', userSchema);

module.exports = User;
