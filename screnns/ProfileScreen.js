import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useProperties } from '../contexts/PropertyContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '../assets/Theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import ClearStorageButton from '../components/Data/ClearStorage';

export default function ProfileScreen({ navigation }) {

  const { properties, deleteProperty } = useProperties(); // Utiliser le contexte pour obtenir et supprimer les propriétés
  // Filtrer annonces de l’utilisateur actuel (ici "Vous")
  const mine = properties.filter((p) => p.owner === 'Vous');

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>Mes Annonces</Text>
      {mine.length === 0 ? (
        <Text style={styles.noItems}>Vous n'avez aucune annonce publiée.</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mine}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.myProperty}>
              <Text style={styles.myPropertyTitle}>{item.title}</Text>
              <Text style={styles.myPropertyTitle}>{item.price}</Text>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  Alert.alert('Supprimer', 'Voulez-vous supprimer cette annonce ?', [
                    { text: 'Annuler', style: 'cancel' },
                    { text: 'Oui', style: 'destructive', onPress: () => deleteProperty(item.id) },
                  ]);
                }}>
                <Text style={{ color: 'white' }}><FontAwesome name="trash-o" size={24} color="#e63946" /></Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProperty', { property: item })}
                style={styles.deleteBtn}
              >
                <Text style={{ color: 'blue' }}><AntDesign name="edit" size={24} color="blue" /></Text>
              </TouchableOpacity>
            </View>
          )}
        />

      )}
      {/* Boutton pour vider la cache */}
      <View>
        <ClearStorageButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#e9f5f3',
    padding: 20,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#264653',
  },
  noItems: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },
  myProperty: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  myPropertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#264653',
    flex: 1,
    marginRight: 12,
  },
  deleteBtn: {
    backgroundColor: COLORS.greenWhite,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 7,
    marginLeft: 8,
    elevation: 2,
  },
});
