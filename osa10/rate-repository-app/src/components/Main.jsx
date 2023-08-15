// import Constants from 'expo-constants';
import {  StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import SignInForm from './SignInForm';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});

const Main = () => {
  return (
    <><View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path="/" element={<RepositoryList />}/>
            <Route path="/repositories/:id" element={<SingleRepository />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
            
            
      </View></>
  );
};

export default Main;