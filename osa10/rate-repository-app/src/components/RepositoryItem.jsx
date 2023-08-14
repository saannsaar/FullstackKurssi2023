import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import LanguageBox from "./LanguageBox";
import NumberItem from "./NumberItem";

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

const individualItem = ( item ) => {
    console.log(item)
    if (item) {
    return (
        <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            
          }}
        >
          <Image style={styles.pictureContainer} source={{ uri: item.ownerAvatarUrl }} />
          <View style={styles.descriptionContainer}>
            <View style={{paddingBottom:8}}>
              <Text fontWeight={'bold'} fontSize={'subHeading'}>
                {item.fullName}
              </Text>
            </View>
            <View style={{paddingBottom:8}} >
              <Text style={{ flexWrap:'wrap', flexShrink:1}}  color={'textSecondary'}>{item.description}</Text>
            </View>
            <View >
              <LanguageBox item={item.language} />
            </View>
          </View>
        </View>
        <View style={styles.numberContainer}>
          <NumberItem numberValue={item.stargazersCount} numberName={'Stars'} />
          <NumberItem numberValue={item.forksCount} numberName={'Forks'} />
          <NumberItem numberValue={item.reviewCount} numberName={'Reviews'} />
          <NumberItem numberValue={item.ratingAverage} numberName={'Ratings'} />
        </View>
      </View>
        )
    }
    
}

export default individualItem;