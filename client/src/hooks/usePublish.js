const usePublish = (client, topic, data) => {
    if (topic === 'antenna') {
        let message = { 'topic': topic, 'direction': data.direction, 'state': data.state }
        if (data.state === 1) {
            client.publish(topic, JSON.stringify(message))
            data.setState(0)
        } else {
            client.publish(topic, JSON.stringify(message))
            data.setState(1)
        }
    } else if (topic === 'valve') {
        let message = { 'topic': topic, 'state': data.state }
        if (data.state === 0) {
            client.publish(topic, JSON.stringify(message))
            data.setState(1)
        } else {
            client.publish(topic, JSON.stringify(message))
            data.setState(0)
        }
    }

}

export default usePublish;