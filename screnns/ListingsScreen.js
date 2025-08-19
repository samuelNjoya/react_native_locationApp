import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import PropertyCard from '../components/PropertyCard';

export default function ListingsScreen({ navigation, properties }) {
  const [searchText, setSearchText] = useState('');

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(searchText.toLowerCase()) || 
    p.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.listingsContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par titre ou lieu..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="always"
      />
      {filtered.length === 0 ? (
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>Aucune annonce trouvée.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() => navigation.navigate('Detail', { property: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listingsContainer: {
    flex: 1,
    backgroundColor: '#e9f5f3',
    paddingHorizontal: 15,
    paddingTop: 10
  },
  searchInput: {
    height: 44,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});
