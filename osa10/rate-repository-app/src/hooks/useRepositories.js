import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
  });


  const [repoData, setRepoData] = useState();

  const fetchData = async () => {
    console.log(data)
    if (data !== undefined && data.repositories !== undefined) {
      console.log(data)
        setRepoData(data.repositories)
    }
  }

  useEffect(() => {
   fetchData();
  }, [data])
  
  if(error) {
    console.log(error);
  } 

  console.log(repoData)
  return { repoData, loading, refetch: fetchData }
};

export default useRepositories;