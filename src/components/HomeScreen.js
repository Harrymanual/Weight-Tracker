import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Tracker</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Weight Entry"
          onPress={() => navigation.navigate('WeightEntry')}
        />
        <Button
          title="Graphs"
          onPress={() => navigation.navigate('Graph')}
        />
        <Button
          title="debug"
          onPress={() => navigation.navigate('DebugScreen')}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default HomeScreen;