import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage"

export const useLogOut = () => {
    const authStorage = useAuthStorage();
    const client = useApolloClient();

    const logOut = async () => {
        await authStorage.removeAccessToken();
        client.resetStore();
    }

    return logOut;
}