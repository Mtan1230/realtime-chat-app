const { User, Workspace, Message, Channel } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('workspaces');
      }
      throw AuthenticationError;
    },

    workspace: async (_, { _id }, context) => {
      if (context.user) {
        return await Workspace.findById(_id).populate('channels');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    signup: async (_, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    createWorkspace: async (_, { name }, context) => {
      if (context.user) {
        const workspace = await Workspace.create({
          name,
          owner: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workspaces: workspace._id } }
        );
        return workspace;
      }
      throw AuthenticationError;
    },

    createChannel: async (_, { name, public, workspaceId }, context) => {
      if (context.user) {
        const channel = await Channel.create({
          name,
          owner: context.user._id,
          public,
        })
        const workspace = await Workspace.findOneAndUpdate(
          { _id: workspaceId },
          { $addToSet: { channels: channel } },
          { new: true }
        );
        return channel;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
