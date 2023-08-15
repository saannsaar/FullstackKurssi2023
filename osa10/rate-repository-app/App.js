import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

import AuthStorage from './src/utils/authStorage';
import createApolloClient from './src/utils/apolloClient';
import AuthStorageContext from './src/contexts/AuthStorageContext';


const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

console.log(authStorage)
console.log(Constants.manifest.extra)
console.log(apolloClient)

const App = () => {
  
  return(
    <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
       
      </ApolloProvider>
      </NativeRouter>
     </>
  )
};

export default App;