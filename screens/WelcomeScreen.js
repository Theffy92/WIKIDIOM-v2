import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleStartButtonPress = () => {
    navigation.navigate('Home'); // Navigate to the LoginScreen when Start button is pressed
  };

  const handleSpanishButtonPress = () => {
    navigation.navigate('Inicio');
  };

  const handleEnglishButtonPress = () => {
    navigation.navigate('Home');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Wikidiom!</Text>
      <TouchableOpacity style={styles.button} onPress={handleSpanishButtonPress}>
        <Text style={styles.buttonText}>Español</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEnglishButtonPress}>
        <Text style={styles.buttonText}>English</Text>
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
