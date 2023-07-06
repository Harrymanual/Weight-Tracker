import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const EditData = () => {
  // TODO: fetch and display the data to be edited
  return (
    <View style={styles.container}>
      <Text>Edit Data Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // TODO: define your styles
});

export default EditData;