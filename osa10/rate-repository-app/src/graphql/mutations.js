import { gql } from '@apollo/client';

export const LOG_IN = gql`
mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
        repositoryId
    }
}`