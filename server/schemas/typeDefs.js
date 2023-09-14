const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    image: String,
    googleId: String,
    workspaces: [Workspace]!
  }

  type Workspace {
    _id: ID
    name: String
    owner: User
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
