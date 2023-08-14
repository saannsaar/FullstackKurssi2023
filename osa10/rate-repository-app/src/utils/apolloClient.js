import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';


// Constants.manifest.extra.apollourl

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apollourl,
});



const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;