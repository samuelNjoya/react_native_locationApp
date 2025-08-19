import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function ProfileScreen({ properties, onDelete }) {
  const mine = properties.filter(p => p.owner === 'Vous');

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>Mes Annonces</Text>
      {mine.length === 0 ? (
        <Text style={styles.noItems}>Vous n'avez aucune annonce publiée.</Text>
      ) : (
        <FlatList
          data={mine}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.myProperty}>
              <Text style={styles.myPropertyTitle}>{item.title}</Text>
              <TouchableOpacity 
                style={styles.deleteBtn} 
                onPress={() => {
                  Alert.alert('Supprimer', 'Voulez-vous supprimer cette annonce ?', [
                    {text: 'Annuler', style: 'cancel'},
                    {text: 'Oui', style: 'destructive', onPress: () => onDelete(item.id)},
                  ]);
                }}>
                <Text style={{color: 'white'}}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    backgroundColor: '#e63946',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    elevation: 2,
  },
});
