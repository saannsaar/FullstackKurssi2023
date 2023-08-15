import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
  },
  verticleDivider: {
    height: '100%',
    width: 1,
    backgroundColor: '#c8e1fa',
  }
});
const NumberItem = ({ numberValue, numberName }) => {

  const numbersToThousands = (numberValue) => {
    // If number is more than 1000 it will be presented in thousands 
    //  with the precision of one decimal and with a "k" suffix.
    if (numberValue >= 1000) {
       
      const newNumber = (numberValue / 1000).toFixed(1);
     
      
    // If the decimal is "0", remove it
    // 19.0 -> 19
      if (newNumber.slice(-1) === '0') {
        return `${newNumber.substring(0, newNumber.length -2)}k`;
      }
      return `${newNumber}k`;
    }
    return numberValue;
  };

  return (
    <><View style={styles.container}>
          <Text fontWeight={'bold'} fontSize={'subHeading'}>
              {numbersToThousands(numberValue)}
          </Text>
          <Text color={'textSecondary'}>{numberName}</Text>
          </View>
          {numberName !== 'Ratings' ? 
          <><View style={styles.verticleDivider}></View></> 
          :
          <></>}
         
      </>
  );
};

export default NumberItem;