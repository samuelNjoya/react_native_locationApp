import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ListingsScreen from '../../screnns/ListingsScreen';
import PropertyDetailScreen from '../../screnns/PropertyDetailScreen';

export default function ListingsStack({ properties }) {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Listings"  options={{ title: 'Annonces' }} 
              children={props => <ListingsScreen {...props} properties={properties} />}
              // Le paramètre children te permet de passer des props personnalisées
            />
            <Stack.Screen name="Detail" component={PropertyDetailScreen} options={{ title: 'Detail de l"Annonces' }}  />
        </Stack.Navigator>
    );  
}
