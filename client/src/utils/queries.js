import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMe() {
     me {
      workspaces {
        _id
        name
        channels {
          _id
          name
          public
        }
      }
    }
  }
`;
