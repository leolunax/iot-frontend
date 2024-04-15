import React from 'react';
import LedControl from "./components/LedControl";
import SensorData from "./components/SensorData";
import './index.css';
import SensorCharts from './components/SensorCharts';

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black w-full overflow-hidden">
      <div className='text-white text-4xl font-bold tracking-tight mb-10'>IoT Dashboard</div>
      
      <SensorData />
      <LedControl />
      <SensorCharts />
      
      <div className="h-[300px]"></div> 
    </div>
  );
}

export default App;
