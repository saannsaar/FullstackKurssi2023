import {  useApolloClient, useMutation } from "@apollo/client";
import { LOG_IN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";


const useLogin = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    
    
    const [mutate, result] = useMutation(LOG_IN);
   
   
    // console.log("USE LOGIN", result, mutate)
    const signIn = async ({ username, password }) => {
       if (typeof username === "string") {
        console.log("On string")
       }
       const credentials = { username, password };
 
        try {
            const { data } = await mutate({ variables: { credentials } });
            
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