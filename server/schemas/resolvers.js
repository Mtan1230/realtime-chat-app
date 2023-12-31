const { User, Workspace, Message, Channel } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const { PubSub, withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    messageCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('MESSAGE_CREATED'),
        (payload, variables) => {
          // Only push an update if the message is on
          // the correct channel for this operation
          return (
            payload.messageCreated.channel.toString() === variables.channelId
          );
        }
      ),
    },
  },

  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('workspaces');
      }
      throw AuthenticationError;
    },

    workspace: async (_, { _id }, context) => {
      if (context.user) {
        return await Workspace.findById(_id)
          .populate('channels')
          .populate('users');
      }
      throw AuthenticationError;
    },

    channel: async (_, { _id }, context) => {
      if (context.user) {
        return await Channel.findById(_id)
          .populate({
            path: 'messages',
            populate: {
              path: 'createdBy',
            },
          })
          .populate('users');
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
          users: [context.user._id],
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
          users: [context.user._id],
        });
        const workspace = await Workspace.findOneAndUpdate(
          { _id: workspaceId },
          { $addToSet: { channels: channel } },
          { new: true }
        );
        return channel;
      }
      throw AuthenticationError;
    },

    addCoworker: async (
      _,
      { email, workspaceId, channelId = null },
      context
    ) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { email },
          { $addToSet: { workspaces: workspaceId } },
          { new: true }
        );
        const workspace = await Workspace.findOneAndUpdate(
          { _id: workspaceId },
          { $addToSet: { users: user._id } }
        );
        if (channelId) {
          await Channel.findOneAndUpdate(
            { _id: channelId },
            { $addToSet: { users: user._id } }
          );
        } else {
          for (const channel of workspace.channels) {
            await Channel.findOneAndUpdate(
              { _id: channel },
              { $addToSet: { users: user._id } }
            );
          }
        }
        return user;
      }
      throw AuthenticationError;
    },

    sendMessage: async (_, { text, channelId }, context) => {
      if (context.user) {
        const message = await Message.create({
          content: text,
          createdBy: context.user._id,
          channel: channelId,
        });
        await message.populate('createdBy');
        const channel = await Channel.findOneAndUpdate(
          { _id: channelId },
          { $addToSet: { messages: message._id } },
          { new: true }
        );
        pubsub.publish('MESSAGE_CREATED', { messageCreated: message });
        return message;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
