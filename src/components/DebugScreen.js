import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { getAllKeys, getMultipleWeights, clearDatabase } from './Database';

const DebugScreen = () => {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const keys = await getAllKeys();
      const weights = await getMultipleWeights(keys);
      setWeights(weights);
    };

    fetchWeights();
  }, []);

  const handleClearDatabase = async () => {
    await clearDatabase();
    setWeights([]); // Clear the weights state after the database is cleared
    console.log('Database Cleared');
  };

  return (
    <View>
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