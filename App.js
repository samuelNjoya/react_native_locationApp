import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './screnns/HomeScrenn';
import ListingsScreen from './screnns/ListingsScreen';
import PropertyDetailScreen from './screnns/PropertyDetailScreen';
import ProfileScreen from './screnns/ProfileScreen';
import PublishScreen from './screnns/PublishScreen';
import ChatScreen from './screnns/ChatScreen';  

const Tab = createBottomTabNavigator();

export default function App() {
  const [properties, setProperties] = useState([
    {
      id: '1',
      title: 'Appartement moderne dans Yaoundé',
      price: 35000000,
      description: 'Bel appartement avec 3 chambres, proche du centre-ville, idéal pour famille.',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505692952049-41bcb24fce7d?auto=format&fit=crop&w=800&q=80',
      ],
      location: 'Yaoundé',
      bedrooms: 3,
      bathrooms: 2,
      owner: 'Alice',
    },
    {
      id: '2',
      title: 'Villa spacieuse à Douala',
      price: 120000000,
      description: 'Villa avec jardin, 5 chambres, quartier sécurisé, proche écoles et commerces.',
      images: [
        'https://images.unsplash.com/photo-1572120360610-d971b9bfa0f8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1501183638714-6c2b1e9b39da?auto=format&fit=crop&w=800&q=80',
      ],
      location: 'Douala',
      bedrooms: 5,
      bathrooms: 4,
      owner: 'Bob',
    },
  ]);

  const addProperty = (property) => {
    setProperties(prev => [property, ...prev]);
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if(route.name === 'Accueil') {
              return <Ionicons name="home" size={size} color={color} />;
            } else if(route.name === 'Annonces') {
              return <FontAwesome5 name="building" size={size} color={color} />;
            } else if(route.name === 'Publier') {
              return <MaterialCommunityIcons name="plus-box" size={size} color={color} />;
            } else if(route.name === 'Profil') {
              return <Ionicons name="person" size={size} color={color} />;
            } else if(route.name === 'Chat') {
              return <MaterialIcons name="chat" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#2a9d8f',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: { height: 60, paddingBottom: 6, paddingTop: 6, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#ddd', elevation: 10 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Annonces">
          {(props) => <ListingsScreen {...props} properties={properties} />}
        </Tab.Screen>
        <Tab.Screen name="Publier">
          {(props) => <PublishScreen {...props} onPublish={addProperty} />}
        </Tab.Screen>
        <Tab.Screen name="Profil">
          {(props) => <ProfileScreen {...props} properties={properties} onDelete={deleteProperty} />}
        </Tab.Screen>
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
