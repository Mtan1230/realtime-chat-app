const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    image: String
    googleId: String
    workspaces: [Workspace]!
  }

  type Workspace {
    _id: ID
    name: String
    owner: ID
    channels: [Channel]!
    users: [User!]!
  }

  type Channel {
    _id: ID
    name: String
    owner: User
    public: Boolean
    messages: [Message]!
    users: [User!]!
  }

  type Message {
    _id: ID
    content: String
    createdAt: String
    createdBy: User!
    channel: Channel!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    workspace(_id: ID!): Workspace
    channel(_id: ID!): Channel
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(firstName: String!, lastName: String! email: String!, password: String!): Auth
    createWorkspace(name: String!): Workspace
    createChannel(name: String!, public: Boolean!, workspaceId: ID!): Channel
    addCoworker(email: String!, workspaceId: ID!, channelId: ID): User
    sendMessage(text: String!, channelId: ID!): Message
  }
`;

module.exports = typeDefs;
