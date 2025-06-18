//Uncomment these imports out to run the seeding file
// require('dotenv').config();
// const firebase = require('firebase/compat/app');
// require('firebase/compat/auth');
// require('firebase/compat/firestore');

//Uncomment these imports to run the app 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '@env';

// Uncomment this to run the seeding file
// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
// };

//Uncomment this app to run the app
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

//This shouldn't be commented out
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
//line added to try firebase authentication
const auth = firebase.auth();

//Unomment this out to run the app
export {firebase};
//line added to try firebase authentication
export {auth};


//Uncomment this out to run the seeding file
// module.exports = { firebase };
