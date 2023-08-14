import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../screens/Auth/AuthContext';

import WelcomeScreen from '../screens/en/WelcomeScreen';
import HomeScreen from '../screens/en/HomeScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import SignUpScreen from '../screens/Auth/Signup/SignUpScreen';
import ExploreIdiomsScreen from '../screens/en/ExploreIdiomsScreen';
import HomeUserScreen from '../screens/en/HomeUserScreen';
import AddNewIdiomScreen from '../screens/en/AddNewIdiomsScreen';
import IdiomDetailsScreen from '../screens/en/IdiomDetailsScreen';

import PaginaBienvenida from '../screens/es/PaginaBienvenida';
import PaginaInicio from '../screens/es/PaginaInicio';
import Acceso from '../screens/Auth/Login/Acceso';
import Registro from '../screens/Auth/Signup/Registro';
import ExploraModismos from '../screens/es/ExploraModismos';
import PaginaUsuario from '../screens/es/PaginaUsuario';
import AgregarModismo from '../screens/es/AgregarModismo';
import ModismosDetalles from '../screens/es/ModismosDetalles';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <AuthProvider>
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
          <Stack.Screen name="Agregar" component={AgregarModismo} />
          <Stack.Screen name="Modismos" component={ModismosDetalles} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
