import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (variables) => {

  const { data, fetchMore, loading, error, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

 console.log(data)
 console.log(error)
  return { repositories: data?.repositories, 
    fetchMore: handleFetchMore, loading, error, ...result }
};

export default useRepositories;