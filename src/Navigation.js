import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import WeightEntry from './components/WeightEntry';
import Graph from './components/Graph';
import EditData from './components/EditData';
import DailyWeightGraph from './components/DailyWeightGraph';
import ThreeDayAverageGraph from './components/ThreeDayAverageGraph';
import FiveDayAverageGraph from './components/FiveDayAverageGraph';
import TenDayAverageGraph from './components/TenDayAverageGraph';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WeightEntry" component={WeightEntry} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="EditData" component={EditData} />
        <Stack.Screen name="DailyWeightGraph" component={DailyWeightGraph} />
        <Stack.Screen name="ThreeDayAverageGraph" component={ThreeDayAverageGraph} />
        <Stack.Screen name="FiveDayAverageGraph" component={FiveDayAverageGraph} />
        <Stack.Screen name="TenDayAverageGraph" component={TenDayAverageGraph} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;