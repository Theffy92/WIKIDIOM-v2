import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {auth} from '../../config';

const PaginaUsuario = ({navigation}) => {
    const handleExploreIdioms = () => {
        navigation.navigate('Explora');
    };
    
    const handleAddNewIdiom = () => {
        navigation.navigate('Agregar');
    };
    const handleLogout = () => {
        auth
          .signOut()
          .then(() => {
            console.log('Cerró sesión exitosamente.');
            navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] }); // Reset the navigation stack to Welcome screen
          })
          .catch(error => alert(error.message));
    };

    return (
        <View style={{flex:1}}>
          <LinearGradient colors={['#31C7B1D0', '#405990D3', '#183965E3' ]} style={{flex:1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleExploreIdioms} style={styles.button}>
                    <Text style={styles.buttonText}>Explorar Modismos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddNewIdiom} style={styles.button}>
                    <Text style={styles.buttonText}>Agregar Modismo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

    );
};

export default PaginaUsuario

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#F5F5F5',
    },
    button: {
      backgroundColor: '#1DAA7D9F',
      borderColor: '#312F31D3',
      borderRadius: 8,
      borderWidth:2,
      paddingVertical: 16,
      paddingHorizontal: 32,
      marginBottom: 16,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logoutButton:{
      backgroundColor:'#AE341ECD',
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });