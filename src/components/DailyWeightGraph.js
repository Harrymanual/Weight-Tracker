import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getWeights } from './Database'; // replace this with the relative path to your database file

const DailyWeightGraph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getWeights((weights) => {
      let dates = weights.map(({ date }) => date);
      let weightData = weights.map(({ weight }) => weight);

      setData({
        labels: dates,
        datasets: [
          {
            data: weightData,
          },
        ],
      });
    });
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 10} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DailyWeightGraph;