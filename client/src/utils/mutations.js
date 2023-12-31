import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation createWorkspace($name: String!) {
    createWorkspace(name: $name) {
      _id
      name
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation createChannel($name: String!, $public: Boolean!, $workspaceId: ID!) {
    createChannel(name: $name, public: $public, workspaceId: $workspaceId) {
      _id
      name
      owner {
        _id
      }
      public
    }
  }
`;

export const ADD_COWORKER = gql`
  mutation addCoworker($email: String!, $workspaceId: ID!, $channelId: ID) {
    addCoworker(
      email: $email
      workspaceId: $workspaceId
      channelId: $channelId
    ) {
      _id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $channelId: ID!) {
    sendMessage(text: $text, channelId: $channelId) {
      _id
      content
      createdAt
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;
