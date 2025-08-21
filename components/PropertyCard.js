import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

export default function PropertyCard({ property, onPress }) {
  return (
    // <TouchableOpacity style={styles.propertyCard} onPress={onPress} activeOpacity={0.8}>
    //   {/* <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />  key={index} a ajouter*/}
    //   <Image  source={{  uri: property.images[0] }} style={styles.propertyImage} />
    //   <View style={styles.propertyInfo}>
    //     <Text style={styles.propertyTitle} numberOfLines={1}>{property.title}</Text>
    //     <Text style={styles.propertyPrice}>{property.price.toLocaleString()} FCFA</Text>
    //     <Text style={styles.propertyLocation}><Ionicons name="location-outline" size={14} /> {property.location}</Text>
    //   </View>
    // </TouchableOpacity>

    <TouchableOpacity style={styles.propertyCard} onPress={onPress} activeOpacity={0.8}>
      {(() => {
        const uri = property.images[0];
        const isVideo = uri.match(/\.(mp4|mov|avi|mkv|webm)$/i);

        if (isVideo) {
          return (
            <Video
              source={{ uri }}
              style={styles.propertyImage}
              useNativeControls
              resizeMode="cover"
              isLooping
            />
          );
        } else {
          return (
            <Image
              source={{ uri }}
              style={styles.propertyImage}
            />
          );
        }
      })()}

      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle} numberOfLines={1}>{property.title}</Text>
        <Text style={styles.propertyPrice}>{property.price.toLocaleString()} FCFA</Text>
        <Text style={styles.propertyLocation}>
          <Ionicons name="location-outline" size={14} /> {property.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  propertyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 3,
  },
  propertyImage: {
    width: 110,
    height: 110,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  propertyInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#264653',
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a9d8f',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 13,
    color: 'gray',
  },
});
