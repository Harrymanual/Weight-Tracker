import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const Graph = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Show Daily Weight"
        onPress={() => navigation.navigate('DailyWeightGraph')}
        color='#add8e6'
      />
      <Button
        title="Show 3-Day Average"
        onPress={() => navigation.navigate('ThreeDayAverageGraph')}
        color='#add8e6'
      />
      <Button
        title="Show 5-Day Average"
        onPress={() => navigation.navigate('FiveDayAverageGraph')}
        color='#add8e6'
      />
      <Button
        title="Show 10-Day Average"
        onPress={() => navigation.navigate('TenDayAverageGraph')}
        color='#add8e6'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});

export default Graph;