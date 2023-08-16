import {  useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useCreateReview = () => {
   
    
    const [mutate, result] = useMutation(CREATE_REVIEW);
    console.log(result)
   
    const createNew = async ({ repositoryName, ownerName, rating, text }) => {
      
        console.log(rating)
        console.log(text)
       const review = { repositoryName, ownerName, rating, text };
 
        try {
            const { data } = await mutate({ variables: { review } });
            console.log(data)
            return data;
        } catch(error) {
        console.log("CREATE_REVIEW ERROR: ", error)
       }

      };
    
      return [createNew, result];
    

    
};

export default useCreateReview;