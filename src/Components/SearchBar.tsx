import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch, navigation }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Call the onSearch function passed as a prop to perform the search
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchBar;
