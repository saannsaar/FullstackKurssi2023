import { useMutation } from "@apollo/client"
import { SIGN_UP } from "../graphql/mutations"


const useSignUp = () => {

    const [mutate, result] = useMutation(SIGN_UP);

    const signUp = async ({ username, password }) => {

        const user = { username, password } ;
        try {
            const { data } = await mutate({ variables: user });
            console.log(data);
            return data;
        } catch (error) {
            console.log("SIGN_UP ERROR: ", error)
        }
    }

    return [signUp, result];
}

export default useSignUp;