import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const WeightEntryScreen = () => {
  const [weight, setWeight] = useState('');

  const handleSaveWeight = () => {
    // Implement your logic to save the weight data
    console.log('Weight saved:', weight);
    // Clear the input field
    setWeight('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <Button title="Save Weight" onPress={handleSaveWeight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default WeightEntryScreen;