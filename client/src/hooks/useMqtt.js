import React, { useEffect } from 'react';
import { useMqtt } from '../context/MqttContext'; // Import the custom hook

const MyComponent = () => {
    const mqttClient = useMqtt(); // Get the MQTT client from the context

    useEffect(() => {
        if (mqttClient) {
            // You can interact with the MQTT client here
            mqttClient.subscribe('antenna/control', (err) => {
                if (err) {
                    console.log('Error subscribing to topic:', err);
                }
            });

            mqttClient.on('message', (topic, message) => {
                console.log('Received message:', message.toString());
            });
        }
    }, [mqttClient]);

    return <div>BoonDocker Hub MQTT Connected</div>;
};

export default MyComponent;
