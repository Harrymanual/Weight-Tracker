import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { getAllKeys, getMultipleWeights } from './Database';
import { VictoryLine, VictoryAxis, VictoryScatter } from 'victory-native';
import { scaleTime, scaleLinear } from 'd3-scale';

const DailyWeightGraph = () => {
  const [data, setData] = useState([]);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(0);

  useEffect(() => {
    const fetchWeights = async () => {
      const keys = await getAllKeys();
      console.log("getAllKeys returned:", keys);
      const weights = keys ? await getMultipleWeights(keys) : [];
      console.log("getMultipleWeights returned:", weights);
      if (weights) {
        // Sort data by date
        weights.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Update minWeight and maxWeight
        const weightValues = weights.map((item) => item.weight);
        const min = Math.min(...weightValues);
        const max = Math.max(...weightValues);
        setMinWeight(min);
        setMaxWeight(max);

        // Update yMin and yMax
        setYMin(min - 2);
        setYMax(max + 2);
      }
      setData(weights || []);
    };

    fetchWeights();
  }, []);

  if (!data.length) {
    return (
      <View style={styles.container}>
        <Text>No data to display</Text>
      </View>
    );
  }
  console.log("Data for chart:", data);

  const formatX = (value) => {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatY = (value) => {
    return `${value} kg`;
  };

  const xAccessor = (item) => new Date(item.date);
  const yAccessor = (item) => item.weight;
  console.log(xAccessor);
  console.log(yAccessor);

  const { width: SIZE } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <VictoryLine
        data={data}
        x={(datum) => xAccessor(datum)}
        y={(datum) => yAccessor(datum)}
        scale={{ x: scaleTime(), y: scaleLinear().domain([yMin, yMax]) }}
        style={{
          data: { stroke: 'black', strokeWidth: 2 },
        }}
      />
      <VictoryScatter
        data={data}
        x={(datum) => xAccessor(datum)}
        y={(datum) => yAccessor(datum)}
        scale={{ x: scaleTime(), y: scaleLinear().domain([yMin, yMax]) }}
        size={4}
        style={{
          data: { fill: 'black' },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(value) => formatY(value)}
        style={{ axisLabel: { padding: 30, color: 'black' } }}
        domain={[yMin, yMax]}
      />
      <VictoryAxis
        tickFormat={(value) => formatX(value)}
        style={{ axisLabel: { padding:30, color: 'black' } }}
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