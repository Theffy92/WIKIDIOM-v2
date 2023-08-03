import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaginaInicio = ({ navigation }) => {
  const handleContinueAsGuest = () => {
    // Handle logic for "Continue as a guest" button
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the LoginScreen
  };

  const handleRegister = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUpScreen
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to Wikidiom!</Text> */}
      <TouchableOpacity style={styles.button} onPress={handleContinueAsGuest}>
        <Text style={styles.buttonText}>Continuar como invitado</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Accesar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaginaInicio;
