// import Constants from 'expo-constants';
import {  StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import FlexboxExample from './RepositoryItem';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
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