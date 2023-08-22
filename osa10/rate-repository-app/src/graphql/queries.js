import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($first: Int, $after: String, $searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(first: $first, after: $after, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection){
        edges {
            cursor
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
        pageInfo {
            endCursor
            hasNextPage
            startCursor
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
query getRepository($first: Int, $after: String, $id: ID!) {
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
        reviews (first: $first, after: $after){
            totalCount
            pageInfo {
                endCursor
                hasNextPage
                startCursor
            }
            edges {
                cursor
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