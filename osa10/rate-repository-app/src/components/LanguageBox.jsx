import Text from "./Text"
import { View, StyleSheet } from "react-native"


const styles = StyleSheet.create({
    languageContainer: {
      padding: 6,
      borderRadius: 10,
      backgroundColor: '#3b82f6',
      alignSelf: 'flex-start',
    },
  });

const LanguageBox = ({ item }) => {
    return (
        <View style={styles.languageContainer}> 
            <Text fontWeight={'bold'} >
                {item}
            </Text>
        </View>
    )
}

export default LanguageBox;