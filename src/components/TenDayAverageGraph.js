import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { getAllKeys, getMultipleWeights } from './Database';
import { Dimensions, View, Text } from 'react-native';

const calculateRollingAverage = (data, windowSize) => {
  let results = [];
  for (let i = 0; i <= data.length - windowSize; i++) {
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      sum += data[i + j].weight;
    }
    results.push({
      date: data[i + windowSize - 1].date, // The date of the last data point in the window
      average: sum / windowSize // The average of the data points in the window
    });
  }
  return results;
}

const TenDayAverageGraph = () => {
  const [averageData, setAverageData] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const keys = await getAllKeys();
      const weights = keys ? await getMultipleWeights(keys) : [];
      if (weights) {
        // Sort data by date
        weights.sort((a, b) => new Date(a.date) - new Date(b.date));
        const rollingAverageData = calculateRollingAverage(weights, 10);
        setAverageData(rollingAverageData);
      }
    };

    fetchWeights();
  }, []);

  const averageWeightData = averageData.map(item => item.average);
  const dateData = averageData.map(item => item.date);

  const windowHeight = Dimensions.get('window').height;
  const chartHeight = windowHeight * 0.9;

  let maxPoints = Math.min(14, dateData.length - 1);

  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <style>
    #container {
      height: ${chartHeight}px; /* Set the chart height here */
      width: 100%;
    }
    </style>
    </head>
    <body>
    <div id="container"></div>
    <script>
    Highcharts.chart('container', {
      chart: {
        type: 'line',
        scrollablePlotArea: {
          minWidth: ${dateData.length * 100}, 
          scrollPositionX: 1
        }
      },
      title: {
        text: '10 Day Rolling Average Weight'
      },
      xAxis: {
        categories: ${JSON.stringify(dateData)},
        labels: {
          rotation: -45
        },
        min: 0, // The lowest value to show on x-axis
        max: ${maxPoints}, // The highest value to show on x-axis.
        scrollbar: {
          enabled: true
        }
      },
      yAxis: {
        title: {
          text: 'Weight (kg)'
        }
      },
      series: [{
        name: 'Weight',
        data: ${JSON.stringify(averageWeightData)}
      }]
    });
    </script>
    </body>
    </html>
    `;

  // If there are not enough data points, display a message instead of the WebView
  if (averageData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Not enough data to calculate rolling average. Need at least 10 data points.</Text>
      </View>
    );
  }

  // Otherwise, render the WebView as normal
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
    />
  );
};

export default TenDayAverageGraph;