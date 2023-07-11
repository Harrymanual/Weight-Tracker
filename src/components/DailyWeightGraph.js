import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { getAllKeys, getMultipleWeights } from './Database';

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

  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    </head>
    <body>
    <div id="container"></div>
    <script>
    Highcharts.chart('container', {
      title: {
        text: 'Daily Weight'
      },
      xAxis: {
        categories: ${JSON.stringify(dateData)},
        labels: {
          rotation: -45
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