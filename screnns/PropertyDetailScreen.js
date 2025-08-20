import React from 'react';
import { ScrollView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { COLORS } from '../assets/Theme';

const { width } = Dimensions.get('window');

export default function PropertyDetailScreen({ route }) {
  const { property } = route.params;

  return (
    <ScrollView style={styles.detailContainer} contentContainerStyle={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true}>
        {property.images.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.detailImage} />
        ))}
      </ScrollView>
      <View style={styles.detailInfo}>
        <Text style={styles.detailTitle}>{property.title}</Text>
        <Text style={styles.detailPrice}>{property.price.toLocaleString()} FCFA</Text>
        <Text style={styles.detailLocation}><Ionicons name="location-outline" size={18} /> {property.location}</Text>
        <Text style={styles.detailDesc}>{property.description}</Text>
        <Text style={styles.detailFeatures}>Chambres : {property.bedrooms} | Salles de bain : {property.bathrooms}</Text>
        <Text style={styles.detailOwner}>Propriétaire : {property.owner}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  detailImage: {
    width,
    height: 280,
  },
  detailInfo: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#264653',
  },
  detailPrice: {
    fontSize: 20,
    color: COLORS.greenColors,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailLocation: {
    fontSize: 16,
    marginBottom: 15,
    color: 'gray',
  },
  detailDesc: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  detailFeatures: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 7,
  },
  detailOwner: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#777',
  },
});
