import React, { createContext, useContext, useEffect, useRef } from 'react';
import mqtt from 'mqtt';

const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
    const clientRef = useRef(null);

    useEffect(() => {
        if (!clientRef.current) {
            const brokerAddress = 'ws://192.168.1.25:8080'; // Use WebSocket URL
            const options = { password: 'passwd', username: 'hunter' };

            clientRef.current = mqtt.connect(brokerAddress, options);

            clientRef.current.on('connect', () => {
                console.log('Connected to MQTT broker');
            });

            clientRef.current.on('error', (err) => {
                console.error('MQTT error:', err);
            });
        }

        return () => {
            if (clientRef.current) {
                clientRef.current.end(); // Clean up connection
            }
        };
    }, []);

    return (
        <MqttContext.Provider value={clientRef.current}>
            {children}
        </MqttContext.Provider>
    );
};

export const useMqtt = () => {
    return useContext(MqttContext);
};
