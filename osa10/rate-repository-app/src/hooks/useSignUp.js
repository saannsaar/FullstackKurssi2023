import { useMutation } from "@apollo/client"
import { SIGN_UP } from "../graphql/mutations"


const useSignUp = () => {

    const [mutate, result] = useMutation(SIGN_UP);


    console.log("USE SIGN UP", result, mutate)
    const signUp = async ({ username, password }) => {

        
        console.log(username, password)
        try {
            const { data } = await mutate({ variables: { user: { username, password }}  });
            console.log(data);
            return data;
        } catch (error) {
            console.log("SIGN_UP ERROR: ", error)
        }
    }

    return [signUp, result];
}

export default useSignUp;