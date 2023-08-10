// import Constants from 'expo-constants';
import {  StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import FlexboxExample from './RepositoryItem';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <><View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path="/" element={<RepositoryList />}/>
        </Routes>
            
            <FlexboxExample />
      </View></>
  );
};

export default Main;