/**
 * ---------------------------------------------------------------------------------------------
 * Component : SearchInput
 * Purpose : This component is used as a text input to search for a city in weather app
 * Author(s) : Sashank Pindiproli
 * ---------------------------------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchInput({ placeholder, location, onSubmit }) {
  const [inputVal, setInputVal] = useState(location);
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        underlineColorAndroid="transparent"
        clearButtonMode="always"
        onChangeText={setInputVal}
        onSubmitEditing={() => onSubmit(inputVal)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,

    justifyContent: 'center',
    backgroundColor: '#666',
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    height: 40,
    width: 300,
    marginHorizontal: 20,
    paddingHorizontal: 10
  }
});
