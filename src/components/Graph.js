import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Graph = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Show Daily Weight"
        onPress={() => navigation.navigate('DailyWeightGraph')}
      />
      <Button
        title="Show 3-Day Average"
        onPress={() => navigation.navigate('ThreeDayAverageGraph')}
      />
      <Button
        title="Show 5-Day Average"
        onPress={() => navigation.navigate('FiveDayAverageGraph')}
      />
      <Button
        title="Show 10-Day Average"
        onPress={() => navigation.navigate('TenDayAverageGraph')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // TODO: define your styles
});

export default Graph;