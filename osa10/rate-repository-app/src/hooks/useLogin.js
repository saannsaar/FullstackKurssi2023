import { useMutation } from "@apollo/client";

import { LOG_IN } from "../graphql/mutations";

const useLogin = () => {
    const [login, result] = useMutation(LOG_IN);
    
    const logIn = async ({ username, password }) => {
        const result = await login({ variables: {username, password } });
        console.log(result)
        return result;
    };

    return [logIn, result];
};

export default useLogin;