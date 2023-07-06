import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeWeight = async (date, weight) => {
  try {
    await AsyncStorage.setItem(date, weight);
  } catch (error) {
    console.log('Error saving data: ', error);
  }
};

export const getWeight = async (date) => {
  try {
    const value = await AsyncStorage.getItem(date);
    return value != null ? Number(value) : null;
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};

export const getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch(e) {
    console.log('Error fetching keys: ', e);
  }
  return keys;
}

export const getMultipleWeights = async (keys) => {
  let weights = [];
  try {
    const result = await AsyncStorage.multiGet(keys);
    weights = result.map(req => ({date: req[0], weight: Number(req[1])}));
  } catch (error) {
    console.log('Error fetching multiple weights: ', error);
  }
  return weights;
};

export const clearDatabase = async () => {
  try {
    await AsyncStorage.clear();
  } catch(e) {
    console.log('Error clearing database: ', e);
  }
};