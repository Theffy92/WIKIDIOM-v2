const { firebase } = require('./config');
const seedData = require('./data/seedData');

const seeding = async function () {
  try {
    for (const idiomData of seedData) {
      // Destructure the properties on the idiom object
      const {
        language,
        country,
        idiom,
        countryVariations,
        meaning,
        examples,
        translatedMeaning,
        examplesTranslation,
      } = idiomData;

      console.log('Current idiom in the loop: ', idiom);

      // Create the base document data
      const docData = {
        language,
        country,
        idiom,
        meaning,
        translatedMeaning,
        examples,
        examplesTranslation,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // Check if countryVariations exists and add it to docData if it does
      if (countryVariations) {
        docData.countryVariations = countryVariations;
      }

      await firebase.firestore().collection('idioms').add(docData);

      console.log('Idiom added to Firestore');
    }

    console.log('Data seeding completed successfully.');
  } catch (error) {
    console.error('Error adding idiom to Firestore:', error);
  }
};

seeding();
