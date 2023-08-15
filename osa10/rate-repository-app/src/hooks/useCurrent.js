import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useCurrent = () => {
    const { loading, data } = useQuery(CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <div>Loading...</div>;

    console.log('Current', data)

    return { me: data?.me };
};

export default useCurrent;