
import { View, StyleSheet, Image, Pressable, Button, Linking, FlatList, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";

import useCurrent from "../hooks/useCurrent";
import { useNavigate } from "react-router-native";
import useDelete from "../hooks/useDelete";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0fbfc'
    },
    horizontalcontainer: {
        padding:10,
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
      paddingLeft:10,
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


export const SingleReviewItem = (review) => {
    console.log(review);
    const navigate = useNavigate();
    console.log(review.review.rating)

    const {  me } = useCurrent(true);
    console.log(me);
    const [deleteReview] = useDelete();
    console.log(review.review.user.username)
    if (me.username === review.review.user.username) {
        console.log("SAMA", review)
    }

    const handleDelete = async () => {
      
     
            Alert.alert('Delete review', 'Are you sure you want to delete this review?',
            [{text: 'No!'}, {text: 'Yes, delete this review!', 
        onPress: async () => {
            try {
                await deleteReview({ id: review.review.id});
            } catch (error) {
                console.log("ERROR DELETE: ", error)
            }
        }}]) }
           
        
    

    return (
        <>
        <View style={styles.container}>
        <View style={styles.horizontalcontainer}>

            
            <View style={styles.ratingContainer}>
                <Text fontWeight={'bold'} color={'primary'}> {review.review.rating}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text  color={'textBlack'}  fontWeight={'bold'}>{review.review.user.username}</Text>
                <Text color={'textGrey'}>{new Date(review.review.createdAt).toLocaleDateString()}</Text>
                <Text style={{paddingTop: 6}}color={'textBlack'}>{review.review.text}</Text>
                
            </View>
            
        </View>
        {me?.username == review.review.user.username ? <View style={styles.horizontalcontainer}>
            <Button style={{marginRight: 20}} color='#68bdc4' width='49%' onPress={() => navigate(`/repositories/${review.review.repositoryId}`)} title='View repository'/>
            <Button color='#f07171' width='49%' onPress={() => handleDelete()} title='Delete review'/>
            </View> : null}
            </View>
            </>
    )
}
export default SingleReviewItem;