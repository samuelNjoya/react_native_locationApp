// components/FavoriteIcon.js
import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProperties } from '../contexts/PropertyContext';

export default function FavoriteIcon({ propertyId, style }) {
  const { favorites, toggleFavorite } = useProperties();
  const isFavorite = favorites.includes(propertyId);

  const handlePress = () => {
    toggleFavorite(propertyId);
    Alert.alert(
      isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      isFavorite ? "Cette annonce n'est plus dans vos favoris." : "Annonce ajoutée aux favoris."
    );
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={28}
        color={isFavorite ? "red" : "gray"}
      />
    </TouchableOpacity>
  );
}
