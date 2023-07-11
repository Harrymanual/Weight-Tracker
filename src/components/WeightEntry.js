import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getWeight, storeWeight } from './Database';

const WeightEntry = () => {
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState(false);
  const [dateString, setDateString] = useState(getTodaysDateString());

  useEffect(() => {
    const fetchWeight = async () => {
      const weight = await getWeight(dateString);
      if (weight !== null) {
        setWeight(weight.toString());
        setStatus(true);
      } else {
        setStatus(false);
      }
    };

    fetchWeight();
  }, [dateString]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateString(getTodaysDateString());
    }, 60 * 60 * 1000);  // check for date change every hour

    return () => {
      clearInterval(timer);  // cleanup on unmount
    };
  }, []);

  const submitWeight = async () => {
    if (isNaN(weight)) {
      Alert.alert('Invalid input', 'Please enter a valid number');
      return;
    }

    console.log('submitWeight called');
    await storeWeight(dateString, weight);
    setStatus(true);
    setWeight(''); // clear the weight input
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
      <Text style={status ? styles.completed : styles.notCompleted}>
        {status ? 'Completed' : 'Not Completed'}
      </Text>
    </View>
  );
};

function getTodaysDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];  // get YYYY-MM-DD format
}

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