import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepository = ( id ) => {
    console.log(id)
  const { data, error, loading, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network"
  });

  console.log(data, error)
  return { data, error, loading, refetch }
};

export default useRepository;