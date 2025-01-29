import network
import time
from machine import Pin
from umqtt.simple import MQTTClient

# MQTT setup
MQTT_BROKER = "192.168.1.51"
MQTT_CLIENT_ID = "AntennaControlClient"
MQTT_TOPIC = "antenna/control"
STATUS_TOPIC = "antenna/status"  # Topic for antenna state updates
REQUEST_TOPIC = "antenna/status/request"  # Corrected topic for status requests

# Wi-Fi setup
SSID = "BellWiFi1"
PASSWORD = "Bell1411!"

# Pin setup
step_pin = Pin(7, Pin.OUT)  # Step pin for stepper motor
dir_pin = Pin(6, Pin.OUT)   # Direction pin
enable_pin = Pin(5, Pin.OUT)  # Enable pin (0 = active, 1 = disabled)
raise_stop_pin = Pin(17, Pin.IN, Pin.PULL_UP)  # Stop switch for raise (limit switch)
lower_stop_pin = Pin(18, Pin.IN, Pin.PULL_UP)  # Stop switch for lower
raise_trigger = Pin(9, Pin.IN, Pin.PULL_DOWN)  # External trigger for raising
lower_trigger = Pin(10, Pin.IN, Pin.PULL_DOWN)  # External trigger for lowering

# Store antenna state (default is "Lowered")
antenna_state = "Lowered"

# Connect to Wi-Fi
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print(f"Connecting to {SSID}...")
        wlan.connect(SSID, PASSWORD)
        while not wlan.isconnected():
            time.sleep(1)
    print(f"Connected to {SSID} with IP address {wlan.ifconfig()[0]}")

# MQTT Callback
def mqtt_callback(topic, msg, client):
    global antenna_state  # Use global state variable

    print(f"Received message on {topic}: {msg}")

    if topic == MQTT_TOPIC.encode():
        if msg == b"Raise":
            print("Raising antenna...")
            move_antenna(1, client)  # Raise antenna
        elif msg == b"Lower":
            print("Lowering antenna...")
            move_antenna(0, client)  # Lower antenna
    elif topic == REQUEST_TOPIC.encode():
        send_state_update(antenna_state, client)  # Respond with current state

# Connect to MQTT Broker
def connect_mqtt():
    client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER)
    client.set_callback(lambda topic, msg: mqtt_callback(topic, msg, client))
    client.connect()
    client.subscribe(MQTT_TOPIC)
    client.subscribe(REQUEST_TOPIC)  # Subscribe to the corrected status request topic
    print(f"Subscribed to {MQTT_TOPIC} and {REQUEST_TOPIC}")
    return client

# Send a state update to MQTT
def send_state_update(state, client):
    print(f"Sending state update: {state}")
    client.publish(STATUS_TOPIC, state)

# Motor control logic
def move_antenna(direction, client):
    global antenna_state  # Use global variable to store state

    enable_pin.value(0)  # Enable motor driver (0 = enable, 1 = disable)
    dir_pin.value(direction)  # Set direction (1 = up, 0 = down)

    start_time = time.ticks_ms()  # Start movement timer

    while True:
        if direction == 1:  # Raising
            if not raise_stop_pin.value():  # Stop if limit switch is reached
                print("Raise stop reached.")
                break
            if raise_trigger.value():  # Stop if external trigger is activated
                print("Raise triggered to stop.")
                break
        elif direction == 0:  # Lowering
            if not lower_stop_pin.value():  # Stop if limit switch is reached
                print("Lower stop reached.")
                break
            if lower_trigger.value():  # Stop if external trigger is activated
                print("Lower triggered to stop.")
                break

        # Stop if the maximum time has been reached (1.5 sec)
        if time.ticks_ms() - start_time > 1500:
            print("Maximum movement time reached. Stopping motor.")
            break

        # Pulse the step pin to move the motor
        step_pin.value(1)
        time.sleep_us(500)  # Adjust pulse width as needed
        step_pin.value(0)
        time.sleep_us(300)  # Adjust delay for speed control

    # Stop the motor
    print("Movement completed.")
    enable_pin.value(1)  # Disable motor driver

    # Update and send the new state
    antenna_state = "Raised" if direction == 1 else "Lowered"
    send_state_update(antenna_state, client)

# Main Program
def main():
    print("Starting program...")

    # Connect to Wi-Fi
    connect_wifi()

    # Connect to MQTT broker
    client = connect_mqtt()

    # Send initial state
    send_state_update(antenna_state, client)

    # Keep listening for MQTT messages
    try:
        while True:
            client.wait_msg()  # Wait for incoming messages
    except KeyboardInterrupt:
        print("Exiting program...")
        client.disconnect()

# Start the main function
if __name__ == "__main__":
    main()

