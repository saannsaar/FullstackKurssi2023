
import { View, StyleSheet, Image, Pressable, Button, Linking, FlatList } from "react-native";
import Text from "./Text";
import LanguageBox from "./LanguageBox";
import NumberItem from "./NumberItem";
import { useNavigate, useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
      backgroundColor: '#f0fbfc',
      flexDirection: 'row'
    
    },
    ratingContainer: {
        borderColor: theme.colors.primary,
        borderWidth: 3,
        borderRadius: 22.5,
        width: 45,
        height: 45,
        marginRight: 10,
        justifyContent: 'center',
       alignItems: 'center',
    },
    descriptionContainer: {
      flexShrink: 1,
      padding: 2,
    },
});

  const ItemSeparator = () => <View style={styles.seperate} />;


const ReviewItem = (item) => {

   console.log(item.item)

   const reviewNodes = item?.item?.edges.map(edge => edge.node) || [];
    console.log(reviewNodes)
    return (
       <FlatList 
       data={reviewNodes}
       renderItem={({item}) => <SingleReviewItem review={item} />}
       ItemSeparatorComponent={ItemSeparator}/>
    )
}


const SingleReviewItem = (review) => {
    console.log(review);
    console.log(review.review.rating)

    return (
        <View style={styles.container}>

            <View style={styles.ratingContainer}>
                <Text fontWeight={'bold'} color={'primary'}> {review.review.rating}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text  color={'textBlack'}  fontWeight={'bold'}>{review.review.user.username}</Text>
                <Text color={'textGrey'}>{new Date(review.review.createdAt).toLocaleDateString()}</Text>
                <Text style={{paddingTop: 6}}color={'textBlack'}>{review.review.text}</Text>
            </View>
        </View>
    )
}
export default ReviewItem;