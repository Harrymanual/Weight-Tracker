import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Navigation from './src/Navigation';

export default function App() {

  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar style="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8F1923', // Set your desired background color here
  },
});