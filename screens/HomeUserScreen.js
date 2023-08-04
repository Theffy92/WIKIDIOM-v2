import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {auth} from '../config';

const HomeUserScreen = ({navigation}) => {
    const handleExploreIdioms = () => {
        navigation.navigate('ExploreIdioms');
    };
    
    const handleAddNewIdiom = () => {
        navigation.navigate('AddNewIdiom');
    };
    const handleLogout = () => {
        auth
          .signOut()
          .then(() => {
            console.log('Successfully logged out.');
            navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] }); // Reset the navigation stack to Welcome screen
          })
          .catch(error => alert(error.message));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleExploreIdioms} style={styles.button}>
                <Text style={styles.buttonText}>Explore Idioms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddNewIdiom} style={styles.button}>
                <Text style={styles.buttonText}>Add New Idiom</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeUserScreen

const styles = StyleSheet.create({})