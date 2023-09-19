import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded($channelId: ID!) {
    messageCreated(channelId: $channelId) {
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
