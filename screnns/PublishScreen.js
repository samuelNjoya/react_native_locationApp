import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function PublishScreen({ onPublish }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = () => {
    if (!title || !price || !description || !location || !bedrooms || !bathrooms || !images) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (isNaN(price) || isNaN(bedrooms) || isNaN(bathrooms)) {
      Alert.alert('Erreur', 'Prix, chambres et salles de bain doivent être des nombres.');
      return;
    }

    const newProperty = {
      id: Date.now().toString(),
      title,
      price: parseInt(price),
      description,
      location,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      images: images.split(',').map(url => url.trim()),
      owner: 'Vous',
    };

    onPublish(newProperty);
    Alert.alert('Succès', 'Annonce publiée avec succès!');
    setTitle('');
    setPrice('');
    setDescription('');
    setLocation('');
    setBedrooms('');
    setBathrooms('');
    setImages('');
  };

  return (
    <KeyboardAvoidingView style={styles.publishContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20, paddingTop: 15 }}>
        <TextInput style={styles.input} placeholder="Titre" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Prix (FCFA)" keyboardType="numeric" value={price} onChangeText={setPrice} />
        <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" multiline value={description} onChangeText={setDescription} />
        <TextInput style={styles.input} placeholder="Localisation" value={location} onChangeText={setLocation} />
        <TextInput style={styles.input} placeholder="Nombre de chambres" keyboardType="numeric" value={bedrooms} onChangeText={setBedrooms} />
        <TextInput style={styles.input} placeholder="Nombre de salles de bain" keyboardType="numeric" value={bathrooms} onChangeText={setBathrooms} />
        <TextInput
          style={[styles.input, { marginBottom: 30 }]}
          placeholder="URLs des images (séparés par des virgules)"
          value={images}
          onChangeText={setImages}
        />
        <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
          <Text style={styles.publishButtonText}>Publier</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  publishContainer: {
    flex: 1,
    backgroundColor: '#e9f5f3',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  publishButton: {
    backgroundColor: '#2a9d8f',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  publishButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});
