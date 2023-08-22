import { View, StyleSheet, Image, Pressable, Button, Linking } from "react-native";
import Text from "./Text";
import LanguageBox from "./LanguageBox";
import NumberItem from "./NumberItem";
import { useNavigate, useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import ReviewItem from "./ReviewItem";


const styles = StyleSheet.create({
    container: {
      padding: 10,
      margin: 10,
      flex: 1,
      backgroundColor: '#f0fbfc',
      justifyContent: 'center'
    
    },
    numberContainer: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    pictureContainer: {
      width: 55,
      height: 55,
      borderRadius: 10,
    },
    descriptionContainer: {
      flex:1, 
      marginBottom: 10,
      justifyContent: 'center',
      flexShrink:1,
      paddingLeft: 20,
    },

  });

const SingleRepository = () => {

    const { id } = useParams();

    console.log(id);

    const { data, loading } = useRepository(id);
    

    const repository = data?.repository;

    console.log(repository);
    if (loading) return (<View><Text>Loading...</Text></View>);
    else if (!data) return (<View><Text>Repository from ${ id } not found.</Text></View>);

     

    return (
       <>
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
         <View testID='RepositoryItem' style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            
          }}
        >
          <Image style={styles.pictureContainer} source={{ uri: repository.ownerAvatarUrl }} />
          <View style={styles.descriptionContainer}>
            <View style={{paddingBottom:8}}>
              <Text fontWeight={'bold'} fontSize={'subHeading'}>
                { repository.fullName }
              </Text>
            </View>
            <View style={{paddingBottom:8}} >
              <Text style={{ flexWrap:'wrap', flexShrink:1}}  color={'textSecondary'}>{repository.description}</Text>
            </View>
            <View >
              <LanguageBox item={ repository.language } />
            </View>
          </View>
        </View>
        <View style={styles.numberContainer}>
          <NumberItem numberValue={ repository.stargazersCount } numberName={'Stars'} />
          <NumberItem numberValue={repository.forksCount} numberName={'Forks'} />
          <NumberItem numberValue={repository.reviewCount} numberName={'Reviews'} />
          <NumberItem numberValue={repository.ratingAverage} numberName={'Ratings'} />
        </View>
        <Button color='#68bdc4' width='50%' onPress={() => Linking.openURL(repository.url)} title='Open in GitHub'/>
      </View>
     
       </Pressable> 
       
       {repository.reviews?.edges ?  <ReviewItem item={repository.reviews}/> : null}
        </>
       
    )
}

export default SingleRepository;