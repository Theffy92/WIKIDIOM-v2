import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AddNewIdiomScreen from './screens/AddNewIdiomsScreen';
import ExploreIdiomsScreen from './screens/ExploreIdiomsScreen';

import PaginaInicio from './screens/PaginaInicio';
import PaginaBienvenida from './screens/PaginaBienvenida';
import HomeUserScreen from './screens/HomeUserScreen';
import IdiomDetailsScreen from './screens/IdiomDetailsScreen';
import ExploraModismos from './screens/ExploraModismos';
import Acceso from './screens/Acceso';
import Registro from './screens/Registro';
import PaginaUsuario from './screens/PaginaUsuario';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ExploreIdioms" component={ExploreIdiomsScreen} />
        <Stack.Screen name="HomeUser" component={HomeUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewIdiom" component={AddNewIdiomScreen} />
        <Stack.Screen name="IdiomDetails" component={IdiomDetailsScreen} />
        
        <Stack.Screen name="Bienvenida" component={PaginaBienvenida} options={{ headerShown: false }}/>
        <Stack.Screen name="Inicio" component={PaginaInicio} />
        <Stack.Screen name="Acceso" component={Acceso} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Explora" component={ExploraModismos} />
        <Stack.Screen name="Usuario" component={PaginaUsuario} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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




