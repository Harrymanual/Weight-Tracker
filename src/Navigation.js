import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import WeightEntry from './components/WeightEntry';
import Graph from './components/Graph';
import DailyWeightGraph from './components/DailyWeightGraph';
import ThreeDayAverageGraph from './components/ThreeDayAverageGraph';
import FiveDayAverageGraph from './components/FiveDayAverageGraph';
import TenDayAverageGraph from './components/TenDayAverageGraph';
import DebugScreen from './components/DebugScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WeightEntry" component={WeightEntry} options={{ title: 'Weight Entry' }} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="DailyWeightGraph" component={DailyWeightGraph} options={{ title: 'Daily Weight' }}/>
        <Stack.Screen name="ThreeDayAverageGraph" component={ThreeDayAverageGraph} options={{ title: 'Three Day Rolling Average' }} />
        <Stack.Screen name="FiveDayAverageGraph" component={FiveDayAverageGraph} options={{ title: 'Five Day Rolling Average' }} />
        <Stack.Screen name="TenDayAverageGraph" component={TenDayAverageGraph} options={{ title: 'Ten Day Rolling Average' }} />
        <Stack.Screen name="DebugScreen" component={DebugScreen} options={{ title: 'Editing Screen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;