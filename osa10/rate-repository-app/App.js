import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();
console.log(Constants.manifest)
console.log(apolloClient)

const App = () => {
  
  return(
    <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
         <Main />
      </ApolloProvider>
      </NativeRouter>
     </>
  )
};

export default App;