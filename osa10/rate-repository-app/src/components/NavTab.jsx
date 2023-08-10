import React from "react";
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Title from "./Title";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      paddingTop: 25,
      paddingBottom: 15,
    },
  });


const NavTab = () => {
    return (
      <Pressable style={styles.container}>
        <Link to={'/'}>
          <Title>Repositories</Title>
        </Link>
      </Pressable>
    );
  };
  
  export default NavTab;