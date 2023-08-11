import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react';
import { useAuth } from './AuthContext';
import { firebase } from '../config';
import ModalSelector from 'react-native-modal-selector';

const IdiomDetailsScreen = ({ route }) => {
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
      alert('Country, variation, idiom, language, and examples must have valid values.');
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
            [newLanguage]: [
              ...(existingVariations[newLanguage] || []),
              {
                country: newCountry,
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
                idiomDocRef.collection('countryVariations').doc(newLanguage).set({
                  countryVariations: updatedVariations[newLanguage],
                });
              });
              alert("Your variation was successfully sent. Once it's approved, it will appear in the Country Variation Section.")
            })
            .catch((error) => {
              console.error('Error adding country variation:', error);
            });
        } else {
          console.error('Idiom document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving idiom document:', error);
      });
  };
  
  
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView  contentContainerStyle={styles.scrollContent}>
        <Text style={styles.idiomTitle}>{idiom.idiom}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Language:</Text> {idiom.language}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Country:</Text> {idiom.country}</Text>
        <Text style={styles.idiomMeaning}><Text style={styles.bold}>Meaning:</Text> {idiom.meaning}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Translated Meaning:</Text> {idiom.translatedMeaning}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Examples:</Text> {idiom.examples}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Translated Examples:</Text> {idiom.examplesTranslation}</Text>
        {/* Check if countryVariations exists */}
        {idiom.countryVariations && (
          <TouchableOpacity style={styles.button} onPress={handleShowCountryVariations}>
          <Text style={styles.buttonText}>
            See other countries variations
          </Text>
          </TouchableOpacity>
        )}
        {showCountryVariations && idiom.countryVariations && (
          <View style={styles.variationContainer}>
            <Text style={styles.variationsTitle}>Country Variations:</Text>
            {Object.keys(idiom.countryVariations).map((language) => (
              <View key={language}>
                <Text style={styles.languageText}>Language: {language}</Text>
                {idiom.countryVariations[language].map((variation, index) => (
                  <View key={index}>
                    <Text style={styles.countryText}>Country: {variation.country}</Text>
                    <Text style={styles.variationText}>Variation: {variation.variation}</Text>
                    <Text style={styles.exampleTitle}>Examples:</Text>
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
              <Text style={styles.buttonText}>Add New Variation</Text>
            </TouchableOpacity>
        )}

            {/* Show the form to add a new variation when the button is clicked */}
            {showAddVariationForm && (
              // <View>
              <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
                <ModalSelector
                  data={[
                    { key: 0, label: 'Select Language', value: '' },
                    { key: 1, label: 'English', value: 'English' },
                    { key: 2, label: 'Spanish', value: 'Spanish' },
                  ]}
                  initValue="Select Language"
                  selectedKey= {newLanguage}
                  onChange={(option) => {
                    setNewLanguage(option.value);
                    setNewCountry('');
                  }}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Select Language *"
                    value={newLanguage}
                    editable={false}
                  />
                </ModalSelector>
                
                {/* Show country options based on selected language */}
                {newLanguage === 'English' && (
                  <ModalSelector
                    data={[
                      { key: 0, label: 'Select Country', value: '' },
                      { key: 1, label: 'USA', value: 'USA' },
                      { key: 2, label: 'England', value: 'England' },
                    ]}
                    initValue="Select Country"
                    onChange={(option) => setNewCountry(option.value)}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Select Country *"
                      value={newCountry}
                      editable={false}
                    /> 
                  </ModalSelector>
                )}
                
                {newLanguage === 'Spanish' && (
                  <ModalSelector
                    data={[
                      { key: 0, label: 'Select Country', value: '' },
                      { key: 1, label: 'Argentina', value: 'Argentina' },
                      { key: 2, label: 'Mexico', value: 'Mexico' },
                      { key: 2, label: 'Spain', value: 'Spain' },
                    ]}
                    initValue="Select Country"
                    onChange={(option) => setNewCountry(option.value)}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Select Country *"
                      value={newCountry}
                      editable={false}
                    /> 
                  </ModalSelector>
                )}

                <TextInput
                  placeholder="New Variation"
                  value={newVariation}
                  onChangeText={setNewVariation}
                />
                <TextInput
                  placeholder="Examples"
                  value={newExamples}
                  onChangeText={setNewExamples}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                  handleAddVariation();
                  handleShowAddCountryVariation();}}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              {/* </View> */}
              </KeyboardAvoidingView>
            )}
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

export default IdiomDetailsScreen;

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
