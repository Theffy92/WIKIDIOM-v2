import React from 'react';
import { StyleSheet } from 'react-native';
import { Navigation } from './Navigation/Navigation';


export default function App() {
  return (
    <Navigation></Navigation>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




