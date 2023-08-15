import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react';
import { useAuth } from '../Auth/AuthContext';
import { firebase } from '../../config';
import ModalSelector from 'react-native-modal-selector';

const languageMapping = {
  'Inglés': 'English',
  'Español': 'Spanish',
};

const countryMapping = {
  'EUA': 'USA',
  'Inglaterra': 'England',
  'Argentina': 'Argentina',
  'México': 'Mexico',
  'España': 'Spain',
};

const ModismosDetalles = ({ route }) => {
  const { idiom } = route.params;
  const idiomDocRef = firebase.firestore().collection('idioms').doc(idiom.id);
  const {user} = useAuth();
  const [showAddVariationForm, setShowAddVariationForm] = useState(false);
  const [newCountry, setNewCountry] = useState('');
  const [newVariation, setNewVariation] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newExamples, setNewExamples] = useState('');
  const [showCountryVariations, setShowCountryVariations] = useState(false);

  const handleShowCountryVariations = () => {
    setShowCountryVariations((prevShowCountryVariations) => !prevShowCountryVariations);
  };

  const handleShowAddCountryVariation = () => {
    setShowAddVariationForm((prevShowAddVariationForm) => !prevShowAddVariationForm);
  };

  const handleAddVariation = () => {
    if (!newCountry || !newVariation || !idiom.idiom || !newExamples || !newLanguage) {
      alert('País, variación, modismo, idioma, y ejemplos deben tener valores válidos.');
      return;
    }
    console.log("newExamples:", newExamples);
    const idiomsCollection = firebase.firestore().collection('idioms');
  
    // Find the idiom with the matching idiom field
    idiomsCollection
      .where('idiom', '==', idiom.idiom)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
  
          const existingVariations = querySnapshot.docs[0].data().countryVariations || {};
  
          const updatedVariations = {
            ...existingVariations,
            [languageMapping[newLanguage]]: [
              ...(existingVariations[languageMapping[newLanguage]] || []),
              {
                country: countryMapping[newCountry],
                variation: newVariation,
                examples: newExamples.split('\n'), 
              },
            ],
          };
  
          // Update the document with the new country variations
          docRef
            .update({
              countryVariations: updatedVariations,
            })
            .then(() => {
              console.log('Country variation added successfully');
              // Update the state to display the newly added variation
              idiomDocRef.get().then((docSnapshot) => {
                const updatedIdiom = docSnapshot.data();
                setNewCountry('');
                setNewVariation('');
                setNewLanguage('');
                setNewExamples('');
                // idiomDocRef.collection('countryVariations').doc(newLanguage).set(updatedVariations[newLanguage]);
                idiomDocRef.collection('countryVariations').doc(languageMapping[newLanguage]).set({
                  countryVariations: updatedVariations[languageMapping[newLanguage]],
                });
              });
              alert("Tu variación fue enviada exitosamente. Aparecerá en la sección Variación de países una vez que sea aceptado.")
            })
            .catch((error) => {
              console.error('Error al agregar una variación del modismo:', error);
            });
        } else {
          console.error('El documento idiom no existe');
        }
      })
      .catch((error) => {
        console.error('Error obteniendo el documento idiom:', error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.idiomTitle}>{idiom.idiom}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Idioma:</Text> {idiom.language}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>País:</Text> {idiom.country}</Text>
        <Text style={styles.idiomMeaning}><Text style={styles.bold}>Significado:</Text>{idiom.meaning}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Traducción del significado:</Text> {idiom.translatedMeaning}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Ejemplos:</Text> {idiom.examples}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Traducción de los ejemplos:</Text> {idiom.examplesTranslation}</Text>
        {/* Check if countryVariations exists */}
        {idiom.countryVariations && (
          <TouchableOpacity style={styles.button} onPress={handleShowCountryVariations}>
          <Text style={styles.buttonText}>
            Ver variaciones de otros países
          </Text>
          </TouchableOpacity>
        )}
        {showCountryVariations && idiom.countryVariations && (
            <View>
              <Text style={styles.variationsTitle}>Variaciones de países:</Text>
              {Object.keys(idiom.countryVariations).map((language) => (
                <View key={language}>
                  <Text style={styles.languageText}>Idioma: {language}</Text>
                  {idiom.countryVariations[language].map((variation, index) => (
                    <View key={index}>
                      <Text style={styles.countryText}><Text style={styles.bold}>País: </Text> {variation.country}</Text>
                      <Text style={styles.variationText}><Text style={styles.bold}>Variación: </Text>{variation.variation}</Text>
                      <Text style={styles.exampleTitle}>Ejemplos:</Text>
                      {variation.examples.map((example, exampleIndex) => (
                        <Text key={exampleIndex} style={styles.exampleText}>
                          {example}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        
          {user && (
              <TouchableOpacity style={styles.button} onPress={handleShowAddCountryVariation}>
                <Text style={styles.buttonText}>Agregar nueva variación</Text>
              </TouchableOpacity>
            )}

            {/* Show the form to add a new variation when the button is clicked */}
            {showAddVariationForm && (
              // <View>
              <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
                <ModalSelector
                  data={[
                    { key: 0, label: 'Seleccionar Idioma', value: '' },
                    { key: 1, label: 'Inglés', value: 'Inglés' },
                    { key: 2, label: 'Español', value: 'Español' },
                  ]}
                  initValue="Seleccionar Idioma"
                  selectedKey= {newLanguage}
                  onChange={(option) => {
                    setNewLanguage(option.value);
                    setNewCountry('');
                  }}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Selecciona Idioma *"
                    value={newLanguage}
                    editable={false}
                  />
                </ModalSelector>
                
                {/* Show country options based on selected language */}
                {newLanguage === 'Inglés' && (
                  <ModalSelector
                    data={[
                      { key: 0, label: 'Selecciona País', value: '' },
                      { key: 1, label: 'EUA', value: 'EUA' },
                      { key: 2, label: 'Inglaterra', value: 'Inglaterra' },
                    ]}
                    initValue="Selecciona País"
                    onChange={(option) => setNewCountry(option.value)}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Selecciona País *"
                      value={newCountry}
                      editable={false}
                    /> 
                  </ModalSelector>
                )}
                
                {newLanguage === 'Español' && (
                  <ModalSelector
                    data={[
                      { key: 0, label: 'Selecciona País', value: '' },
                      { key: 1, label: 'Argentina', value: 'Argentina' },
                      { key: 2, label: 'México', value: 'México' },
                      { key: 2, label: 'España', value: 'España' },
                    ]}
                    initValue="Selecciona País"
                    onChange={(option) => setNewCountry(option.value)}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Selecciona País *"
                      value={newCountry}
                      editable={false}
                    /> 
                  </ModalSelector>
                )}

                <TextInput
                  placeholder="Nueva Variación"
                  value={newVariation}
                  onChangeText={setNewVariation}
                />
                <TextInput
                  placeholder="Ejemplos"
                  value={newExamples}
                  onChangeText={setNewExamples}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                  handleAddVariation();
                  handleShowAddCountryVariation();}}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              {/* </View> */}
              </KeyboardAvoidingView>
            )}
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

export default ModismosDetalles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // paddingBottom: 25,
    backgroundColor: '#fff',
  },
  scrollContent:{
    padding: 20,
  },
  idiomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  idiomMeaning: {
    fontSize: 16,
    marginTop:10,
    marginBottom: 10,
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    color: '#0B2020EE',
    marginTop: 10,
  },
  variationContainer: {
    padding: 10,
  },
  variationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#0B2020EE',
  },
  languageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  countryText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#555',
  },
  variationText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    color: '#555',
  },
  exampleText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 20,
    marginBottom: 5,
  },
  bold:{
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#6B179C9F',
    padding: 15,
    margin:10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});