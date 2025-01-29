import React, { createContext, useState, useEffect } from 'react';
import mqtt from 'mqtt';

export const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
    const brokerUrl = 'ws://192.168.1.51:9002'; // Correct WebSocket port
    const options = { username: 'hunter', password: 'passwd' };

    const [client, setClient] = useState(null);

    useEffect(() => {
        const mqttClient = mqtt.connect(brokerUrl, options);

        mqttClient.on('connect', () => {
            console.log('MQTT Connected');
        });

        mqttClient.on('error', (err) => {
            console.error('MQTT Connection Error:', err);
        });

        setClient(mqttClient);

        return () => {
            mqttClient.end(); // Cleanup on unmount
        };
    }, []);

    return (
        <MqttContext.Provider value={client}>
            {children}
        </MqttContext.Provider>
    );
};
