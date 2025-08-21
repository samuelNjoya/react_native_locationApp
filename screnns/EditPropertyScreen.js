import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useProperties } from '../contexts/PropertyContext';

// Validation avec Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Le titre est obligatoire'),
  price: Yup.number().positive('Doit être positif').required('Le prix est obligatoire'),
  description: Yup.string().required('La description est obligatoire'),
  location: Yup.string().required('La localisation est obligatoire'),
  bedrooms: Yup.number().min(0).required('Nombre de chambres requis'),
  bathrooms: Yup.number().min(0).required('Nombre de salles de bain requis'),
});

export default function EditPropertyScreen({ route, navigation }) {
  const { modifyProperty } = useProperties();
  const { property } = route.params; // annonce à modifier

  const handleSubmit = (values) => {
    // Met à jour l'annonce dans le contexte
    modifyProperty({ ...property, ...values });
    Alert.alert('Annonce modifiée avec succès');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          title: property.title,
          price: property.price.toString(),
          description: property.description,
          location: property.location,
          bedrooms: property.bedrooms.toString(),
          bathrooms: property.bathrooms.toString(),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Titre"
            />
            {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              placeholder="Prix"
              keyboardType="numeric"
            />
            {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

            <TextInput
              style={[styles.input, { height: 80 }]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Description"
              multiline
            />
            {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              value={values.location}
              placeholder="Localisation"
            />
            {touched.location && errors.location && <Text style={styles.error}>{errors.location}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('bedrooms')}
              onBlur={handleBlur('bedrooms')}
              value={values.bedrooms}
              placeholder="Nombre de chambres"
              keyboardType="numeric"
            />
            {touched.bedrooms && errors.bedrooms && <Text style={styles.error}>{errors.bedrooms}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('bathrooms')}
              onBlur={handleBlur('bathrooms')}
              value={values.bathrooms}
              placeholder="Nombre de salles de bain"
              keyboardType="numeric"
            />
            {touched.bathrooms && errors.bathrooms && <Text style={styles.error}>{errors.bathrooms}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Modifier l'annonce</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 6,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
