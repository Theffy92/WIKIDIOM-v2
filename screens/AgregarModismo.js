import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';
import ModalSelector from 'react-native-modal-selector';

const AgregarModismo = () => {
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
        alert('Por favor, rellene los campos obligatorios');
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

      console.log('Modismo agregado a Firestore');
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
      console.error('Error al agregar modismo a Firestore:', error);
    }
  };
  const handleShowCountryVariations = () => {
    setShowCountryVariations((prevShowCountryVariations) => !prevShowCountryVariations);
  };

  const handleAddCountryVariation = () => {
    if (!selectedCountry || !selectedLanguage) {
      alert('Seleccione el país y el idioma.');
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
      <Text style={styles.title}>Agregar Modismo</Text>
      <TextInput
        style={styles.input}
        placeholder="Idioma principal *"
        value={mainLanguage}
        onChangeText={setMainLanguage}
      />
      <TextInput
        style={styles.input}
        placeholder="País principal *"
        value={mainCountry}
        onChangeText={setMainCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Modismo *"
        value={idiom}
        onChangeText={setIdiom}
      />
      <TextInput
        style={styles.input}
        placeholder="Significado *"
        value={meaning}
        onChangeText={setMeaning}
      />
      <TextInput
        style={styles.input}
        placeholder="Traducción de significado *"
        value={translatedMeaning}
        onChangeText={setTranslatedMeaning}
      />
      <TextInput
        style={styles.input}
        placeholder="Ejemplos (separados por nuevas líneas) *"
        value={examples}
        onChangeText={setExamples}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Tradución de ejemplos (separados por nuevas líneas) *"
        value={examplesTranslation}
        onChangeText={setExamplesTranslation}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleShowCountryVariations}>
        <Text style={styles.buttonText}>
        ¿Conoces una equivalencia en inglés o español para este modismo?
        </Text>
      </TouchableOpacity>
      {showCountryVariations && (
        <View>
          <ModalSelector
            data={[
              { key: 0, label: 'Selecciona idioma' },
              { key: 1, label: 'Inglés' },
              { key: 2, label: 'Español' },
            ]}
            initValue="Selecciona idioma"
            onChange={(option) => setSelectedLanguage(option.label)}
          >
            <TextInput
              style={styles.input}
              placeholder="Selecciona idioma *"
              value={selectedLanguage}
              editable={false}
            />
          </ModalSelector>
          {selectedLanguage === 'Inglés' && (
            <ModalSelector
              data={[
                { key: 0, label: 'Selecciona país' },
                { key: 1, label: 'EUA' },
                { key: 2, label: 'Inglaterra' },
              ]}
              initValue="Selecciona país"
              onChange={(option) => setSelectedCountry(option.label)}
            >
              <TextInput
                style={styles.input}
                placeholder="Selecciona país *"
                value={selectedCountry}
                editable={false}
              />
            </ModalSelector>
          )}
          {selectedLanguage === 'Español' && (
            <ModalSelector
              data={[
                { key: 0, label: 'Selecciona país' },
                { key: 1, label: 'Argentina' },
                { key: 2, label: 'México' },
                { key: 3, label: 'España' },
              ]}
              initValue="Selecciona país"
              onChange={(option) => setSelectedCountry(option.label)}
            >
              <TextInput
                style={styles.input}
                placeholder="Selecciona país *"
                value={selectedCountry}
                editable={false}
              />
            </ModalSelector>
          )}
          <TouchableOpacity style={styles.button} onPress={handleAddCountryVariation}>
            <Text style={styles.buttonText}>Agregar país de la variación</Text>
          </TouchableOpacity>
          {countryVariations.map((variation, index) => (
            <View key={index}>
              <Text style={styles.subTitle}>País de la variación {index + 1}</Text>
              <Text style={styles.label}>País:{variation.country}</Text>
              <Text style={styles.label}>Idioma:{variation.language}</Text>
              <Text style={styles.label}>Variación de modismo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Variación *"
                value={variation.variation}
                onChangeText={(value) => {
                  const updatedVariations = [...countryVariations];
                  updatedVariations[index].variation = value;
                  setCountryVariations(updatedVariations);
                }}
                multiline
              />
              <Text style={styles.label}>Ejemplos:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ejemplos (separados por nuevas líneas) *"
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
        <Text style={styles.buttonText}>Agregar modismo</Text>
      </TouchableOpacity>
      <Text style={styles.note}>* Campos obligatorios</Text>
    </ScrollView>
  );
};

export default AgregarModismo;

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