// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   )
// }

// export default HomeScreen;

// const styles = StyleSheet.create({})

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleStartButtonPress = () => {
    navigation.navigate('Home'); // Navigate to the LoginScreen when Start button is pressed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Wikidiom!</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartButtonPress}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
