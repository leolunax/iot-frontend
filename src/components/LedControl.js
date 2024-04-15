import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

function LedControl() {
    const [ledStatus, setLedStatus] = useState('');

    const toggleLED = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/control-led`, {
                ledStatus: ledStatus === 'ON' ? 'OFF' : 'ON'
            });
            setLedStatus(response.data.ledStatus);
        } catch (error) {
            console.error('Error al enviar comando al LED:', error);
        }
    };

    return (
        <div className="text-white space-y-4 p-6">
            <h1 className="text-4xl font-bold tracking-tight">Control de LED</h1>
            <p className="text-2xl font-light mb-10">Estado del LED: <span className="font-medium">{ledStatus || 'Desconocido'}</span></p>
            <div className='flex justify-center mb-12'>
            <Button color="primary" onClick={toggleLED} auto>
                Cambiar Estado del LED
            </Button>
            </div>
        </div>
    );
}

export default LedControl;
