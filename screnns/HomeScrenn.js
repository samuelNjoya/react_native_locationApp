import React from 'react';
import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.homeContainer} contentContainerStyle={{padding: 20}}>
      <Text style={styles.homeTitle}>Bienvenue sur SMARTECHOME</Text>
      <Text style={styles.homeText}>
        Trouvez ou publiez les meilleures annonces immobilières locales au Cameroun. 
        Que vous cherchiez une maison, un appartement ou un terrain, SMARTECHOME est votre partenaire idéal.
      </Text>
      <Image
        source={{uri:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'}}
        style={styles.homeImage}
      />
      <Text style={styles.homeHighlight}>
        Explorez nos fonctionnalités SMARTECH:
      </Text>
      <Text style={styles.homeBullet}>• Recherche pratique avec cartes et filtres avancés.</Text>
      <Text style={styles.homeBullet}>• Publication facile d’annonces avec photos.</Text>
      <Text style={styles.homeBullet}>• Gestion personnelle simplifiée de vos annonces.</Text>
      <Text style={styles.homeBullet}>• Communication intégrée avec les autres utilisateurs.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#264653',
  },
  homeText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#555',
  },
  homeHighlight: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2a9d8f',
  },
  homeBullet: {
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 8,
    color: '#555',
  },
  homeImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 25,
  },
});
