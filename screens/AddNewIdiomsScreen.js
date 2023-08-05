import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';
import { Picker } from '@react-native-picker/picker';

const AddNewIdiomsScreen = () => {
  const [mainLanguage, setMainLanguage] = useState('');
  const [mainCountry, setMainCountry] = useState('');
  const [idiom, setIdiom] = useState('');
  const [meaning, setMeaning] = useState('');
  const [examples, setExamples] = useState('');
  const [translatedMeaning, setTranslatedMeaning] = useState('');
  const [examplesTranslation, setExamplesTranslation] = useState('');
  const [countryVariations, setCountryVariations] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showCountryVariations, setShowCountryVariations] = useState(false);


  const handleAddIdiom = async () => {
    try {
      // Check if required fields are empty before adding the idiom
      if (!mainLanguage || !mainCountry || !idiom || !meaning || !examples || !translatedMeaning || !examplesTranslation) {
        alert('Please fill in all required fields.');
        return;
      }

      const docData = {
        language: mainLanguage,
        country: mainCountry,
        idiom,
        meaning,
        examples: examples.split('\n'),
        translatedMeaning,
        examplesTranslation: examplesTranslation.split('\n'),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // if (countryVariations.length > 0) {
      //   docData.countryVariations = countryVariations;
      // }
      if (countryVariations.length > 0) {
        const countryVariationsData = {};
        countryVariations.forEach((variation) => {
          const language = variation.language;
          if (!countryVariationsData[language]) {
            countryVariationsData[language] = [];
          }
          countryVariationsData[language].push({
            country: variation.country,
            variation: variation.variation,
            examples: variation.examples.split('\n'),
          });
        });
        docData.countryVariations = countryVariationsData;
      }

      await firebase.firestore().collection('idioms').add(docData);

      console.log('Idiom added to Firestore');
      // Reset the input fields after adding the idiom
      setMainLanguage('');
      setMainCountry('');
      setIdiom('');
      setCountryVariations([]);
      setMeaning('');
      setExamples('');
      setTranslatedMeaning('');
      setExamplesTranslation('');
    } catch (error) {
      console.error('Error adding idiom to Firestore:', error);
    }
  };
  const handleShowCountryVariations = () => {
    setShowCountryVariations((prevShowCountryVariations) => !prevShowCountryVariations);
  };

  const handleAddCountryVariation = () => {
    if (!selectedCountry || !selectedLanguage) {
      alert('Please select both country and language for the variation.');
      return;
    }

    const newCountryVariation = {
      country: selectedCountry,
      language: selectedLanguage,
      variation: '',
      examples: '',
    };
    setCountryVariations(prevVariations => [...prevVariations, newCountryVariation]);
    setSelectedCountry('');
    setSelectedLanguage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Add New Idiom</Text>
      <TextInput
        style={styles.input}
        placeholder="Main Language *"
        value={mainLanguage}
        onChangeText={setMainLanguage}
      />
      <TextInput
        style={styles.input}
        placeholder="Main Country *"
        value={mainCountry}
        onChangeText={setMainCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Idiom *"
        value={idiom}
        onChangeText={setIdiom}
      />
      <TextInput
        style={styles.input}
        placeholder="Meaning *"
        value={meaning}
        onChangeText={setMeaning}
      />
      <TextInput
        style={styles.input}
        placeholder="Translated Meaning *"
        value={translatedMeaning}
        onChangeText={setTranslatedMeaning}
      />
      <TextInput
        style={styles.input}
        placeholder="Examples (separated by new lines) *"
        value={examples}
        onChangeText={setExamples}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Examples Translation (separated by new lines) *"
        value={examplesTranslation}
        onChangeText={setExamplesTranslation}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleShowCountryVariations}>
        <Text style={styles.buttonText}>
          Do you know an English or Spanish equivalence for this idiom?
        </Text>
      </TouchableOpacity>
      {showCountryVariations && (
        <View>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="Select Language" value="" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
          </Picker>
          {selectedLanguage === 'English' && (
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="USA" value="USA" />
              <Picker.Item label="England" value="England" />
            </Picker>
          )}
          {selectedLanguage === 'Spanish' && (
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="Argentina" value="Argentina" />
              <Picker.Item label="Mexico" value="Mexico" />
              <Picker.Item label="Spain" value="Spain" />
            </Picker>
          )}
          <TouchableOpacity style={styles.button} onPress={handleAddCountryVariation}>
            <Text style={styles.buttonText}>Add Country Variation</Text>
          </TouchableOpacity>
          {countryVariations.map((variation, index) => (
            <View key={index}>
              <Text style={styles.subTitle}>Country Variation {index + 1}</Text>
              <Text style={styles.label}>Country:</Text>
              <TextInput
                style={styles.input}
                placeholder="Country *"
                value={variation.country}
                onChangeText={(value) => {
                  const updatedVariations = [...countryVariations];
                  updatedVariations[index].country = value;
                  setCountryVariations(updatedVariations);
                }}
              />
              <Text style={styles.label}>Language:</Text>
              <TextInput
                style={styles.input}
                placeholder="Language *"
                value={variation.language}
                onChangeText={(value) => {
                  const updatedVariations = [...countryVariations];
                  updatedVariations[index].language = value;
                  setCountryVariations(updatedVariations);
                }}
              />
              <Text style={styles.label}>Variation:</Text>
              <TextInput
                style={styles.input}
                placeholder="Variation *"
                value={variation.variation}
                onChangeText={(value) => {
                  const updatedVariations = [...countryVariations];
                  updatedVariations[index].variation = value;
                  setCountryVariations(updatedVariations);
                }}
                multiline
              />
              <Text style={styles.label}>Examples:</Text>
              <TextInput
                style={styles.input}
                placeholder="Examples (separated by new lines) *"
                value={variation.examples}
                onChangeText={(value) => {
                  const updatedVariations = [...countryVariations];
                  updatedVariations[index].examples = value;
                  setCountryVariations(updatedVariations);
                }}
                multiline
              />
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleAddIdiom}>
        <Text style={styles.buttonText}>Add Idiom</Text>
      </TouchableOpacity>
      <Text style={styles.note}>* Required fields</Text>
    </ScrollView>
  );
};

export default AddNewIdiomsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6B179C9F',
    padding: 15,
    marginBottom:10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  note: {
    marginTop: 10,
    color: 'red',
  },
});
