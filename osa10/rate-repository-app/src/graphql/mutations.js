import { gql } from '@apollo/client';

export const LOG_IN = gql`
mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`