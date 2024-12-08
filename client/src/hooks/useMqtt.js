import mqtt from 'mqtt';

const useMqtt = () => {
    const brokerAddress = 'http://192.168.1.25:8080';
    const options = { password: 'passwd', username: 'hunter' }

    const client = mqtt.connect(brokerAddress, options)
    return client
}

export default useMqtt;
