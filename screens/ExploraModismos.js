import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const ExploraModismos = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIdioms, setFilteredIdioms] = useState([]);
  const [idiomsData, setIdiomsData] = useState([]);
  const [languageFilter, setLanguageFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState('');
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [filteredCountryOptions, setFilteredCountryOptions] = useState([]);


  useEffect(() => {
    fetchIdioms();
  }, []);
  
  // Apply filters when any filter state changes
  useEffect(() => {
    filterIdioms(languageFilter, countryFilter, orderFilter, searchQuery);
  }, [languageFilter, countryFilter, orderFilter, searchQuery]);

  const fetchIdioms = async () => {
    try {
      // Access the Firestore collection "idioms"
      const querySnapshot = await firebase.firestore().collection('idioms').get();
      const idiomsData = querySnapshot.docs.map((doc) => doc.data());
      setIdiomsData(idiomsData);
      setFilteredIdioms(idiomsData);
      // Extract the unique country names from idiomsData and update countryOptions
      const uniqueCountries = [...new Set(idiomsData.map((idiom) => idiom.country))];
      setCountryOptions(uniqueCountries);
      setFilteredCountryOptions(uniqueCountries);
    } catch (error) {
      console.error('Error al obtener modismos:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterIdioms(text, languageFilter, countryFilter, orderFilter);
  };


  const handleLanguageFilter = (language) => {
    setLanguageFilter(language);
  
    // Get the filtered country options based on the selected language
    const filteredOptions = getFilteredCountryOptions(language);
    setFilteredCountryOptions(filteredOptions);

    // Reset the country filter when changing the language filter
    setCountryFilter('');
  
    // Apply filters on idioms (language and country)
    filterIdioms(language, countryFilter, orderFilter, searchQuery);
  };
  
  const handleCountryFilter = (country) => {
    setCountryFilter(country);
  
    // Get the filtered country options based on the selected language
    const filteredOptions = getFilteredCountryOptions(languageFilter, countryOptions);
    setFilteredCountryOptions(filteredOptions);
  
    // Apply filters on idioms (language and country)
    filterIdioms(languageFilter, country, orderFilter, searchQuery);
  };

  const handleOrderFilter = (order) => {
    setOrderFilter(order);
    filterIdioms(languageFilter, countryFilter, order, searchQuery);
  };

  const filterIdioms = (language, country, order, searchText) => {
    let filtered = idiomsData;
  
    if (language) {
      filtered = filtered.filter((idiom) => idiom.language.toLowerCase() === language.toLowerCase());
    }
  
    if (country) {
      filtered = filtered.filter((idiom) => idiom.country.toLowerCase() === country.toLowerCase());
    }
  
    if (order === 'asc') {
      filtered = filtered.sort((a, b) => a.idiom.localeCompare(b.idiom));
    } else if (order === 'desc') {
      filtered = filtered.sort((a, b) => b.idiom.localeCompare(a.idiom));
    }
  
    if (searchText) {
      filtered = filtered.filter((idiom) => {
        const mainLanguage = idiom.language.toLowerCase();
        const mainCountry = idiom.country.toLowerCase();
        const idiomKeywords = idiom.idiom.toLowerCase();
  
        return (
          mainLanguage.includes(searchText.toLowerCase()) ||
          mainCountry.includes(searchText.toLowerCase()) ||
          idiomKeywords.includes(searchText.toLowerCase())
        );
      });
    }
    
    setFilteredIdioms(filtered);
  };

  const handleResetFilters = () => {
    setLanguageFilter('');
    setCountryFilter('');
    setOrderFilter('');
    setSearchQuery('');
  
    // Reset the country options to show all options
    setFilteredCountryOptions([...countryOptions]);
  
    // Reset the filtered idioms to the original data
    filterIdioms('', '', '', '');
  };
  
  const getFilteredCountryOptions = (selectedLanguage, allCountryOptions) => {
    if (selectedLanguage) {
      // If a language is selected, return only the main countries where that language is spoken
      const mainCountries = idiomsData
        .filter(
          (idiom) =>
            idiom.language.toLowerCase() === selectedLanguage.toLowerCase() &&
            !idiom.countryVariations
        )
        .map((idiom) => idiom.country.toLowerCase());
  
      // Filter the country options to include only the main countries for the selected language
      return allCountryOptions.filter((country) => mainCountries.includes(country.toLowerCase()));
    }
  
    // If no language is selected, return all country options
    return allCountryOptions;
  };
  

  const renderIdiomItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Modismos', { idiom: item })}>
      <Text style={styles.idiomTitle}>{item.idiom}</Text>
      {/* <Text style={styles.idiomMeaning}>{item.meaning}</Text> */}
    </TouchableOpacity>
  );

  const languageOptions = ['English', 'Spanish'];

  const orderOptions = ['asc', 'desc'];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#16355D', '#405990D3', '#31C7B1D0']} style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={[styles.searchInput, { color: 'white' }]}
            placeholder="Buscar modismos por idioma o palabra clave."
            placeholderTextColor="white"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {/* Filter by Language */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity onPress={() => setIsLanguageModalVisible(true)}>
              <Text style={styles.filterButtonText}>Filtrar por idioma</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isLanguageModalVisible}
              onRequestClose={() => setIsLanguageModalVisible(false)}
            >
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={()=> setIsLanguageModalVisible(false)}>
                        <Text style={styles.modalHeaderCloseText}>X</Text>
                  </TouchableOpacity>
                  {/* <Text style={styles.modalTitle}>Filter by Language</Text> */}
                </View>
                {languageOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={[styles.modalOption, languageFilter === option ? styles.selectedOption : null]}
                    onPress={() => {
                      setLanguageFilter(option);
                      setIsLanguageModalVisible(false);
                      filterIdioms(option, countryFilter, orderFilter, searchQuery);
                    }}
                  >
                    <Text style={styles.modalOptionText}>
                      {option === 'English' ? 'Inglés' : 'Español'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Modal>
          </View>
          
          {/* Filter by Country */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity onPress={() => setIsCountryModalVisible(true)}>
              <Text style={styles.filterButtonText}>Filtrar por país</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCountryModalVisible}
              onRequestClose={() => setIsCountryModalVisible(false)}
            >
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={()=> setIsCountryModalVisible(false)}>
                        <Text style={styles.modalHeaderCloseText}>X</Text>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.modalTitle}>Filter by Country</Text> */}
                {countryOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={[styles.modalOption, countryFilter === option ? styles.selectedOption : null]}
                    onPress={() => {
                      setCountryFilter(option);
                      setIsCountryModalVisible(false);
                      filterIdioms(languageFilter, option, orderFilter, searchQuery);
                      
                    }}
                  >
                    <Text style={styles.modalOptionText}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            </Modal>
          </View>

          {/* Order by */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity onPress={() => setIsOrderModalVisible(true)}>
              <Text style={styles.filterButtonText}>Ordenar por</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isOrderModalVisible}
              onRequestClose={() => setIsOrderModalVisible(false)}
            >
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={()=> setIsOrderModalVisible(false)}>
                        <Text style={styles.modalHeaderCloseText}>X</Text>
                  </TouchableOpacity>
                  {/* <Text style={styles.modalTitle}>Order by</Text> */}
                </View>
                {orderOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={[styles.modalOption, orderFilter === option ? styles.selectedOption : null]}
                    onPress={() => {
                      setOrderFilter(option);
                      setIsOrderModalVisible(false);
                      filterIdioms(languageFilter, countryFilter, option, searchQuery);
                    }}
                  >
                    <Text style={styles.modalOptionText}>
                      {option === 'asc' ? 'Ascendente' : 'Descendente'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Modal>
          </View>
          <TouchableOpacity
          style={styles.resetFiltersButton}
          onPress={handleResetFilters}
        >
          <Text style={styles.resetFiltersButtonText}>Restablecer filtros</Text>
        </TouchableOpacity>
          <FlatList
            data={filteredIdioms}
            renderItem={renderIdiomItem}
            keyExtractor={(item) => item.idiom}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom:20,
  },
  idiomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  idiomMeaning: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterButtonText: {
    fontSize: 16,
    color: 'white',
  },
  resetFiltersButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center', // Center the button horizontally
    marginVertical: 10, // Add some vertical margin
  },
  resetFiltersButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    width: '100%',
  },
  modalHeaderCloseText: {
    color: 'red',
    fontSize: 18,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
  },
  modalOptionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#DDDDDD',
  },
});

export default ExploraModismos;
