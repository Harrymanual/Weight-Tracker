import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FiveDayAverageGraph = () => {
  return (
    <View style={styles.container}>
      <Text>5-Day Average Weight Graph</Text>
      {/* TODO: Fetch data and render graph */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FiveDayAverageGraph;