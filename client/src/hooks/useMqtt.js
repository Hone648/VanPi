import { useContext } from 'react';
import { MqttContext } from '../context/MqttContext';

const useMqtt = () => {
    return useContext(MqttContext);
};

export default useMqtt;
