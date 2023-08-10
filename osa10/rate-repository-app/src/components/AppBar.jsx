import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import React from "react";
import NavTab from './NavTab';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBack,
    // ...
  },
  // ...
});



const AppiBar = () => {
  return <View style={styles.container}>
   <ScrollView>
    <NavTab />

   </ScrollView>
  </View>;
};

export default AppiBar;