import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
     me {
      _id
      workspaces {
        _id
        name
      }
    }
  }
`;

export const QUERY_WORKSPACE = gql`
  query workspace($id: ID!) {
    workspace(_id: $id) {
      name
      users {
        _id
        email
        firstName
        lastName
      }
      channels {
        _id
        name
        public
      }
    }
  }
`;

export const QUERY_CHANNEL = gql`
  query channel($id: ID!) {
    channel(_id: $id) {
      messages {
        _id
        content
        createdAt
        createdBy {
          firstName
          lastName
        }
      }
    }
  }
`;