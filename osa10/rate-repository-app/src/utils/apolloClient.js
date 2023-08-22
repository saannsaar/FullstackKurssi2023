import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities';

// Constants.manifest.extra.apollourl

const  apolloUri  = Constants.manifest.extra.apollourl;
console.log(Constants.manifest.extra.apollourl)
console.log(apolloUri)

const httpLink = createHttpLink({
  uri: apolloUri,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      }
    }
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      console.log(accessToken)
      return {
        headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      };
    } catch (error) {
      console.log(error)
      return {
        headers,
      };
    }
  });

  console.log(authLink)


  return new ApolloClient({
    link: authLink.concat(httpLink),
   cache,
  });
};

export default createApolloClient;