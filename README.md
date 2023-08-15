# WikIDIOM

## Overview
This mobile application is for users that are interested in expanding their knowledge of language and culture. The information retrieved is the idiom(s), language, country of origin, the meaning, translation of the meaning, examples, translation of examples and whether a similar idiom exists in another language. The application also allows users to collaborate with their knowledge. If a user would like to contribute to the database by adding information about idioms and slang from a specific region is allowed to as long as certain conditions are met. Specific authentication is put in place for security.
Users are able to retrieve idioms and slang using the search bar by entering a keyword, or filtering a specific language or country. The user can also retrieve the idioms by ascending and descending order. A reset button is put in place to get rid of the filters. A list of all the idioms appears in the Exploreidioms page.

## Screenshots

<img src="/assets/images/welcome.png" alt="Welcome Page" width="400" height="500">. <img src="/assets/images/exploramodismos.png" alt="Explora Modismo" width="400" height="500">. <img src="/assets/images/detallesmodismo.png" alt="Detalles modismo" width="400" height="500">. <img src="/assets/images/variaciones.png" alt="Variaciones" width="400" height="500">

## Features 
1. Database: the user can click on a specific idiom or slang, then an explanation of the meaning and a similar idiom in another language (if it exists) will be retrieved and displayed.
2. Create User Account: the user will be able to contribute to our database once an account is created and authenticated.
3. Add new idiom. The user can contribute by adding idioms to our database.
4. Search by keywords: this input box can take keywords to find specific idioms that match the input words. This could be useful for users that want to search for idioms based on specific words.
5. Search by country: this could be useful for users that would like to search for idioms that are specific to a country by selecting any of the countries that appear in the selection.

## Additional Features
1. Spanish version of the application: an option to navigate the application in spanish language is provided by clicking the Spanish flag located in the Welcome Page. This feature was thought for Spanish speakers.
2. Authentication: a real authentication feature was developed using the Firestore email and password method. 
3. Filter by language: this feature allows the user to filter the search by selecting the language of the idiom. This filter is related to the Filter by country feature, so that when the user selects the language, it automatically filters the countries of that specific language.
4. Order by: this feature allows the user to organize the idioms by ascending or descending order.
5. Add new variation: this allows the user that is logged in to collaborate by adding a new variation of the idiom in the same or different language and country.
6. Add new variation approval alert: when the user creates a new variation of the idiom, an alert is displayed to communicate that it was successfully submitted and once the admin approves the idiom, it will be shown in the application. This is a mock alert and the intention is to show that the admin will review all the information that is added.
7. Add additional idioms: this option is provided when the user adds a new idiom, in the same page can add more idioms of the same or different language and country.


## Dependencies
Expo 
Google Firebase - Firestore
Axios

## Environment Set-Up
XCode instalation
This tool is a simulator that allows you to mimic the user interface of a device for which you are developing an app.

Android Studio
This tool is an emulator that simulates Android devices in your computer.
