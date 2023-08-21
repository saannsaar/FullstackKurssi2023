import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useCurrent = (includeReviews) => {
    console.log("USe current")
    const { data, loading } = useQuery(CURRENT_USER, {
        variables: { includeReviews: includeReviews ?? false },
        fetchPolicy: 'cache-and-network',
    });

   

    console.log('Current', data)

    return { me: data?.me, loading };
};

export default useCurrent;