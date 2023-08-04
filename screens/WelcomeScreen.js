import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



import Colors from '../constants/styles';


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

    <View style={{flex:1}}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{flex:1}}>
      <View style={styles.container}>
          <Text style={styles.title}>Welcome to Wikidiom!</Text>
          <TouchableOpacity style={styles.button} onPress={handleStartButtonPress}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={[styles.languageButton]} onPress={handleSpanishButtonPress}>
                <Image source={require('../icons/spain.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.languageButton]} onPress={handleEnglishButtonPress} >
              <Image source={require('../icons/united-states.png')} />
              </TouchableOpacity>

            </View>
          </View>
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
    padding:0,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100, 
    fontFamily: 'Cochin',
    color:'white'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRights: 10,
  },
  languageButton: {
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
