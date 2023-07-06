import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getWeights } from './Database';

const DebugScreen = () => {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    getWeights(setWeights);
  }, []);

  return (
    <View>
      <ScrollView>
        {weights.map((weight) => (
          <Text key={weight.id}>
            {`ID: ${weight.id}, Date: ${weight.date}, Weight: ${weight.weight}`}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default DebugScreen;