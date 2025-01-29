import React, { useEffect } from 'react';
import useMqtt from '../hooks/useMqtt';

const AntennaControl = () => {
    const mqttClient = useMqtt(); // Get the client from context

    useEffect(() => {
        if (mqttClient) {
            // Subscribe to the topic when the component mounts
            mqttClient.subscribe('antenna/control', (err) => {
                if (err) console.error('Subscription Error:', err);
                else console.log('Subscribed to antenna/control');
            });

            // Listen for messages
            mqttClient.on('message', (topic, message) => {
                console.log(`Received message on ${topic}: ${message.toString()}`);
            });

            // Cleanup on unmount
            return () => {
                mqttClient.unsubscribe('antenna/control');
                mqttClient.removeAllListeners('message');
            };
        }
    }, [mqttClient]);

    const sendCommand = (command) => {
        if (mqttClient) {
            mqttClient.publish('antenna/control', command);
            console.log(`Sent command: ${command}`);
        }
    };

    return (
        <div>
            <h2>Antenna Control</h2>
            <button onClick={() => sendCommand('RAISE')}>Raise Antenna</button>
            <button onClick={() => sendCommand('LOWER')}>Lower Antenna</button>
        </div>
    );
};

export default AntennaControl;
