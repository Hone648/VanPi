from umqtt.simple import MQTTClient
from time import sleep
from controls import toggle_antenna
import json


client_name = "esp32"
broker_addr = "192.168.1.25"
mqttc = MQTTClient(client_name, broker_addr, password="passwd", keepalive=60)
antenna_topic = b"antenna"
antenna_state = 0


def sub_cb(topic, msg):
    data = json.loads(msg)
    print(data)
    if data["topic"] == "antenna":
        toggle_antenna(data)
        antenna_state = not antenna_state


def main(server=broker_addr):
    client = MQTTClient(client_name, server)
    # Subscribed messages will be delivered to this callback
    client.set_callback(sub_cb)
    client.connect(clean_session=True)
    client.subscribe(antenna_topic)
    print(
        "\nConnected to %s. \nSubscribed to %s topic."
        % (server, antenna_topic.decode())
    )

    try:
        while True:
            c.check_msg()
            sleep(1)

    finally:
        client.disconnect()
