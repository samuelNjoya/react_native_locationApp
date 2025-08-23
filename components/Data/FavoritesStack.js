import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from '../../screnns/FavoritesScreen';
import PropertyDetailScreen from '../../screnns/PropertyDetailScreen';


const Stack = createNativeStackNavigator();

export default function FavoritesStack() {// A remplacer favorisScreen dans App.js
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoris' }} />
      <Stack.Screen name="Detail" component={PropertyDetailScreen} options={{ title: 'Détails' }} />
      {/* <Stack.Screen name="EditProperty" component={EditPropertyScreen} options={{ title: 'Modifier l\'annonce' }} /> */}
    </Stack.Navigator>
  );
}
