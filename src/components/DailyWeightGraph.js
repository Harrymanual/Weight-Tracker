import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { getAllKeys, getMultipleWeights } from './Database';
import { Dimensions } from 'react-native'; // Add this import

const DailyWeightGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const keys = await getAllKeys();
      const weights = keys ? await getMultipleWeights(keys) : [];
      if (weights) {
        // Sort data by date
        weights.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Update data
        setData(weights || []);
      }
    };

    fetchWeights();
  }, []);

  const weightData = data.map(item => item.weight);
  const dateData = data.map(item => item.date);

  // Get the window height
  const windowHeight = Dimensions.get('window').height;

  // Calculate 90% of the window height
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
        text: 'Daily Weight'
      },
      xAxis: {
        categories: ${JSON.stringify(dateData)},
        labels: {
          rotation: -45
        },
        min: 0, // The lowest value to show on x-axis
        max: ${maxPoints}, // The highest value to show on x-axis. Set this to one less than the number of data points you want to display at once (because the array index starts at 0).
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
        data: ${JSON.stringify(weightData)}
      }]
    });
    </script>
    </body>
    </html>
    `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
    />
  );
};

export default DailyWeightGraph;