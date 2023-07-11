import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput } from 'react-native';
import { getAllKeys, getMultipleWeights, clearDatabase, storeWeight } from './Database';

const DebugScreen = () => {
  const [weights, setWeights] = useState([]);
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const fetchWeights = async () => {
      const keys = await getAllKeys();
      const weights = await getMultipleWeights(keys);
      setWeights(weights);
    };

    fetchWeights();
  }, []);

  const handleAddWeight = async () => {
    if (date && weight) {
      await storeWeight(date, weight);
      setDate('');
      setWeight('');
      const keys = await getAllKeys();
      const weights = await getMultipleWeights(keys);
      setWeights(weights);
    }
  };

  const handleClearDatabase = async () => {
    await clearDatabase();
    setWeights([]); // Clear the weights state after the database is cleared
    console.log('Database Cleared');
  };

  return (
    <View>
      <TextInput 
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
      />
      <TextInput 
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Button title="Add Weight" onPress={handleAddWeight} />
      <ScrollView>
        {weights.map((weight, index) => (
          <Text key={index}>
            {`Date: ${weight.date}, Weight: ${weight.weight}`}
          </Text>
        ))}
      </ScrollView>
      <Button title="Clear Database" onPress={handleClearDatabase} />
    </View>
  );
};

export default DebugScreen;