import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection){
        edges {
            node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
            }
        }
    }
}`;


export const CURRENT_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
    me {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
                node {
                    id
                    text
                    rating 
                    createdAt
                    repositoryId
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
}`

export const GET_SINGLE_REPOSITORY = gql`
query getRepository($id: ID!) {
    repository(id: $id) {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        url
        reviews {
            edges {
                node {
                    id
                    text
                    rating 
                    createdAt
                    repositoryId
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
}`