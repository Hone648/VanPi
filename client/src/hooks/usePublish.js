const usePublish = (client, topic, data) => {
    if (topic === 'antenna') {
        let message = { 'topic': topic, message: data }
        client.publish(topic, JSON.stringify(message))
        client.publish(topic, JSON.stringify(message))
    }

}

export default usePublish;