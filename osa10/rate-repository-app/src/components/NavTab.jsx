import React from "react";
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Title from "./Title";
import SignIn from "./SignIn";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import  {useLogOut}  from "../hooks/useLogOut";
import SignOut from "./SignOutItem";
import Text from "./Text";


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

  const {data } = useQuery(CURRENT_USER);
  console.log(data)
  const logOut = useLogOut();
    return (
      <><Pressable style={styles.container}>

        <Link style={{paddingLeft:10}}to={'/'}>
          <Title>Repositories</Title>
        </Link>
        <Link style={{paddingLeft:10}}to={'/create-new-review'}>
          <Title>Review</Title>
        </Link>
       {data?.me ? <><Link style={{ paddingLeft: 10, paddingTop: 5 }} to={'/signin'} onPress={logOut}>
          <SignOut />
        </Link></>
        :
          <Link style={{paddingLeft:10, paddingTop:5}} to={'/signin'}>
          <SignIn />
        </Link>}

      </Pressable>
      
     </>
    );
  };
  
  export default NavTab;