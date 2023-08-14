import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../../config';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden!");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registrado con: ', user.email);

        alert("Cuenta creada exitosamente!");

        // Navigate to the Login screen after successful registration
        navigation.navigate('Usuario');
      })
      .catch(error => alert(error.message))
  }

  return (
    <LinearGradient colors={['#16355D', '#405990D3', '#31C7B1D0']} style={{flex:1}}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Nombre'
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Apellido'
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Correo electrónico'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder='Contraseña'
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder='Confirmar contraseña'
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder='Fecha de nacimiento (mes-día-año)'
              value={dateOfBirth}
              onChangeText={text => setDateOfBirth(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Acceso')}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Ya tengo una cuenta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'80%'
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#8a2be2',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#3319A5CB',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#3319A5CB',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Registro;
