import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const WeightEntry = () => {
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('Not Completed');

  useEffect(() => {
    // TODO: check if today's weight has been entered and set status
  }, []);

  const submitWeight = () => {
    // TODO: store weight in the database and set status to 'Completed'
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        keyboardType="numeric"
        placeholder="Enter your weight"
      />
      <Button
        title="Submit"
        onPress={submitWeight}
      />
      <Text style={status === 'Completed' ? styles.completed : styles.notCompleted}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // TODO: define your styles
});

export default WeightEntry;