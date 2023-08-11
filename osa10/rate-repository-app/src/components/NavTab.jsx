import React from "react";
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Title from "./Title";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 20,
      paddingBottom: 15,
      flexDirection: 'row',
      width: '100%',
    },
  });


const NavTab = () => {
    return (
      <><Pressable style={styles.container}>

        <Link style={{paddingLeft:10}}to={'/'}>
          <Title>Repositories</Title>
        </Link>
       
        <Link style={{paddingLeft:10, paddingTop:5}} to={'/signin'}>
            <SignIn />
          </Link>

      </Pressable></>
    );
  };
  
  export default NavTab;