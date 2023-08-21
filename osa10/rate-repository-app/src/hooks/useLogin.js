import {  useApolloClient, useMutation } from "@apollo/client";
import { LOG_IN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";


const useLogin = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    
    
    const [mutate, result] = useMutation(LOG_IN);
   
   
    console.log("USE LOGIN", result, mutate)
    const signIn = async ({ username, password }) => {
       
       console.log("useLogin")
       console.log(username, password)
       
        try {
            const { data } = await mutate({ variables: { credentials: {username, password} } });
            
            if (data) {
             await authStorage.setAccessToken(data.authenticate.accessToken);
             apolloClient.resetStore();
        }
      
       } catch(error) {
        console.log("USELOGIN ERROR: ", error)
       }

      };
    
      return [signIn, result];
    

    
};

export default useLogin;