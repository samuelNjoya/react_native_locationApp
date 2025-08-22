import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clef unique pour AsyncStorage
const STORAGE_KEY = 'properties_storage_key';

const defaultProperties = [
  {
    id: '1',
    title: 'Appartement moderne dans Yaoundé',
    price: 35000000,
    description: 'Bel appartement avec 3 chambres, proche du centre-ville, idéal pour famille.',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
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
      'https://images.unsplash.com/photo-1710883727450-d3a0ab1bbbe3?q=80&w=1163&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Douala',
    bedrooms: 5,
    bathrooms: 4,
    owner: 'Bob',
  },
  {
    id: '3',
    title: 'Villa spacieuse à Kribi',
    price: 140500000,
    description: 'Villa avec jardin, 5 chambres, quartier sécurisé, proche écoles et commerces.',
    images: [
      'https://images.unsplash.com/photo-1710883734891-93709398496d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Kribi',
    bedrooms: 5,
    bathrooms: 4,
    owner: 'Bob',
  },
  {
    id: '4',
    title: 'Villa spacieuse à Kribi',
    price: 140500000,
    description: 'Villa avec jardin, 5 chambres, quartier sécurisé, proche écoles et commerces.',
    images: [
      'https://images.unsplash.com/photo-1638369022547-1c763b1b9b3b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Kribi',
    bedrooms: 5,
    bathrooms: 4,
    owner: 'Bob',
  },
  {
    id: '5',
    title: 'Villa spacieuse à Kribi',
    price: 140500000,
    description: 'Villa avec jardin, 5 chambres, quartier sécurisé, proche écoles et commerces.',
    images: [
      'https://images.unsplash.com/photo-1615127039501-bdcc95f61c63?q=80&w=753&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'Kribi',
    bedrooms: 5,
    bathrooms: 4,
    owner: 'Bob',
  },
  {
    id: '6',
    title: 'Villa spacieuse à Kribi',
    price: 140500000,
    description: 'Villa avec jardin, 5 chambres, quartier sécurisé, proche écoles et commerces.',
    images: [
      'https://images.unsplash.com/photo-1603384596556-78e66c81c91b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'Kribi',
    bedrooms: 5,
    bathrooms: 4,
    owner: 'Bob',
  },
];

const PropertyContext = createContext();

// Provider qui encapsule toute l'application et fournit les données + fonctions
export const PropertyProvider = ({ children }) => {

  const [properties, setProperties] = useState([]);


  // Charger les données au démarrage
  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data !== null) {
          setProperties(JSON.parse(data));
        } else {
          // Pas de données sauvegardées, on initialise avec les propriétés par défaut
          console.log("Pas de données sauvegardées, chargement valeurs par défaut...");
          setProperties(defaultProperties);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties)); // On stocke aussi ce tableau par défaut pour la suite
        }
      } catch (error) {
        console.log("Erreur chargement properties:", error);
        setProperties(defaultProperties); // En cas d'erreur, on initialise avec les propriétés par défaut
      }
    }
    loadProperties();
  }, []);

  // Fonction pour sauvegarder dans AsyncStorage à chaque modification
  const saveProperties = async (newProperties) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProperties));
    } catch (error) {
      console.log("Erreur sauvegarde properties:", error);
    }
  };

  // Ajout d'une annonce
  const addProperty = (property) => {
    const newList = [property, ...properties];
    setProperties(newList);
    saveProperties(newList);
  };

  // Suppression
  const deleteProperty = (id) => {
    const newList = properties.filter(p => p.id !== id);
    setProperties(newList);
    saveProperties(newList);
  };

  // Modification
  const modifyProperty = (updatedProperty) => {
    const newList = properties.map(p => p.id === updatedProperty.id ? { ...p, ...updatedProperty } : p);
    setProperties(newList);
    saveProperties(newList);
  };

  // Fournir le state et fonctions aux composants enfants
  return (
    <PropertyContext.Provider value={{ properties, addProperty, deleteProperty, modifyProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Hook personnalisé pour simplifier la consommation de ce contexte dans les composants
export const useProperties = () => useContext(PropertyContext);
