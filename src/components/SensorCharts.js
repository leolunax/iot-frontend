import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class SensorCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charts: {
        temperature: {
          series: [{ name: 'Temperature', data: [] }],
          options: this.getChartOptions('Temperatura (°C)')
        },
        humidity: {
          series: [{ name: 'Humidity', data: [] }],
          options: this.getChartOptions('Humedad (%)')
        },
        pressure: {
          series: [{ name: 'Pressure', data: [] }],
          options: this.getChartOptions('Presion (hPa)')
        }
      }
    };
  }

  getChartOptions = (title) => ({
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: title,
      align: 'left'
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      range: 1000, // 15 minutes range
    },
    legend: {
      show: false
    }
  });

  componentDidMount() {
    this.interval = setInterval(this.fetchSensorData, 5000); // Fetch new data every 5 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchSensorData = async () => {
    try {
      const [arResponse, espResponse] = await Promise.all([
        axios.get('http://localhost:8000/ar/sens/'),
        axios.get('http://localhost:8000/esp/sens/')
      ]);
      const arSensors = arResponse.data;
      const espSensors = espResponse.data;
      const now = new Date().getTime();

      this.setState(prevState => ({
        charts: {
          temperature: {
            ...prevState.charts.temperature,
            series: [{
              name: 'Temperature',
              data: [...prevState.charts.temperature.series[0].data, {x: now, y: arSensors[arSensors.length - 1]?.temperature}]
            }]
          },
          humidity: {
            ...prevState.charts.humidity,
            series: [{
              name: 'Humidity',
              data: [...prevState.charts.humidity.series[0].data, {x: now, y: arSensors[arSensors.length - 1]?.humidity}]
            }]
          },
          pressure: {
            ...prevState.charts.pressure,
            series: [{
              name: 'Pressure',
              data: [...prevState.charts.pressure.series[0].data, {x: now, y: espSensors[espSensors.length - 1]?.presion}]
            }]
          }
        }
      }));
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  render() {
    const { charts } = this.state;
    return (
      <div className="w-max px-4">
        <div id="temperature-chart" className="mb-4">
          <ReactApexChart options={charts.temperature.options} series={charts.temperature.series} type="line" height={350} width={700} />
        </div>
        <div id="humidity-chart" className="mb-4">
          <ReactApexChart options={charts.humidity.options} series={charts.humidity.series} type="line" height={350} />
        </div>
        <div id="pressure-chart" className="mb-4">
          <ReactApexChart options={charts.pressure.options} series={charts.pressure.series} type="line" height={350} />
        </div>
      </div>
    );
  }
  
}

export default SensorCharts;
