import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (orderBy, orderDirection) => {
  console.log(orderBy, orderDirection)
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {orderBy, orderDirection},
    fetchPolicy: "cache-and-network",
  });
 console.log(data)
 console.log(error)
  return {data, loading, error, refetch}
};

export default useRepositories;