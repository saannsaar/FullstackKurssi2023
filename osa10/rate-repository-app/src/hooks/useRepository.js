import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepository = ( variables ) => {
    
  const { data, fetchMore, loading, error, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  const handleFetchMore = () => {
    const canFetchMore = !result.loading && data?.repository.reviews.pageInfo.hasNextPage;
    if(!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  console.log(data, error, result)
  return { repository: data?.repository, fetchMore: handleFetchMore, loading, error, ...result }
};

export default useRepository;