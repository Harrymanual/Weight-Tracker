import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getWeightByDate, insertWeight, updateWeight } from './Database';

const WeightEntry = () => {
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const dateString = today.toISOString().split('T')[0];  // get YYYY-MM-DD format

  useEffect(() => {
    getWeightByDate(dateString, (weights) => {
      if (weights.length > 0) {
        setWeight(weights[0].weight.toString());
        setStatus('Completed');
      }
    });
  }, [submitted]);

  const submitWeight = () => {
    console.log('submitWeight called');
    getWeightByDate(dateString, (weights) => {
      if (weights.length > 0) {
        updateWeight(weights[0].id, parseFloat(weight));
      } else {
        insertWeight(dateString, parseFloat(weight));
      }
      setStatus('Completed');
      setWeight(''); // clear the weight input
    });
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  completed: {
    color: 'green',
  },
  notCompleted: {
    color: 'red',
  },
});

export default WeightEntry;