import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PaginaInicio = ({ navigation }) => {
  const handleContinueAsGuest = () => {
    navigation.navigate('Explora');// Handle logic for "Continue as a guest" button
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the LoginScreen
  };

  const handleRegister = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUpScreen
  };

  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['#09203F', '#3b5998', '#1EAE98']} style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>¿Qué es un modismo?</Text>
            <Text style={styles.subtitle}>Un modismo es una expresión común que puede no tener sentido cuando se traduce palabra por palabra, por lo que debemos "hacer que tenga sentido". A menudo transmiten una idea específica o transmiten un concepto abstracto de una manera más concisa o vívida. Usamos modismos en nuestro lenguaje cotidiano sin siquiera darnos cuenta. Por ejemplo, la frase "por si las moscas" significa por si acaso.</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleContinueAsGuest}>
            <Text style={styles.buttonText}>Continuar como visitante</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ba55d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    margin: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    margin: 20,
  }
});


export default PaginaInicio;
