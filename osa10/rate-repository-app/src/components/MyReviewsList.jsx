import { FlatList, View } from "react-native";
import useCurrent from "../hooks/useCurrent";
import Text from "./Text";
import { SingleReviewItem } from "./ReviewItem";

const ItemSeparator = () => <View style={styles.seperate} />;

const MyReviewsList = () => {
    const {  me, loading } = useCurrent(true);
    console.log( me)
    const reviewNodes = me?.reviews?.edges?.map(edge => edge.node) || [];

    if (loading) return (<View><Text>Loading your reviews..</Text></View>);
    else if (reviewNodes.length === 0) return (<View><Text>You have 0 reviews.</Text></View>);

    return (
        <FlatList 
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <SingleReviewItem review={item} />}
       />
    )
}



export default MyReviewsList;