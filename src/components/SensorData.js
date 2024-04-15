import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SensorData() {
    const [latestArSensor, setLatestArSensor] = useState(null);
    const [latestEspSensor, setLatestEspSensor] = useState(null);

    useEffect(() => {
        const fetchLatestSensorData = async () => {
            try {
                const arResponse = await axios.get(`${process.env.REACT_APP_API_URL}/ar/sens/`);
                const espResponse = await axios.get(`${process.env.REACT_APP_API_URL}/esp/sens/`);
                
                // Assuming the array is sorted by the backend, otherwise sort it here by timestamp
                if (arResponse.data.length > 0) {
                    setLatestArSensor(arResponse.data[arResponse.data.length - 1]);
                }
                if (espResponse.data.length > 0) {
                    setLatestEspSensor(espResponse.data[espResponse.data.length - 1]);
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchLatestSensorData();
        const intervalId = setInterval(fetchLatestSensorData, 5000); // Update to fetch every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center space-y-3">
            <h1 className="text-3xl font-bold text-blue-300">Datos del Sensor</h1>
            <div className="text-lg text-gray-300 space-y-2">
                <h2 className="text-2xl text-blue-200">Temperatura y Humedad</h2>
                {latestArSensor && (
                    <p>
                        Temperatura: <span className="font-semibold">{latestArSensor.temperature}°C</span>, 
                        Humedad: <span className="font-semibold">{latestArSensor.humidity}%</span>
                    </p>
                )}
                <h2 className="text-2xl text-blue-200">Presión</h2>
                {latestEspSensor && (
                    <p>
                        Presión: <span className="font-semibold">{latestEspSensor.presion} hPa</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default SensorData;
