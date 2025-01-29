import network
import time
from machine import Pin
from umqtt.simple import MQTTClient

# MQTT setup
MQTT_BROKER = "192.168.1.51"
MQTT_CLIENT_ID = "AntennaControlClient"
MQTT_TOPIC = "antenna/control"
STATUS_TOPIC = "antenna/status"  # Topic for antenna state updates

# Wi-Fi setup
SSID = "BellWiFi1"
PASSWORD = "Bell1411!"

# Pin setup
step_pin = Pin(7, Pin.OUT)  # Replace with your step pin number
dir_pin = Pin(6, Pin.OUT)   # Replace with your direction pin number
enable_pin = Pin(5, Pin.OUT)  # Enable pin for motor driver
raise_stop_pin = Pin(17, Pin.IN, Pin.PULL_UP)  # Pin for stopping raise (up)
lower_stop_pin = Pin(18, Pin.IN, Pin.PULL_UP)  # Pin for stopping lower (down)
raise_trigger = Pin(9, Pin.IN, Pin.PULL_DOWN)  # Trigger pin for raising
lower_trigger = Pin(10, Pin.IN, Pin.PULL_DOWN)  # Trigger pin for lowering

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

def mqtt_callback(topic, msg, client):
    print(f"Received message on {topic}: {msg}")
    if msg == b"Raise":
        print("Raising antenna...")
        move_antenna(1, client)  # Raise antenna
    elif msg == b"Lower":
        print("Lowering antenna...")
        move_antenna(0, client)  # Lower antenna

# Connect to MQTT Broker
def connect_mqtt():
    client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER)
    client.set_callback(lambda topic, msg: mqtt_callback(topic, msg, client))  # Pass client to callback
    client.connect()
    client.subscribe(MQTT_TOPIC)
    print(f"Subscribed to {MQTT_TOPIC}")
    return client

# Send a state update to the shared status topic
def send_state_update(state, client):
    print(f"Sending state update: {state}")
    client.publish(STATUS_TOPIC, state)

# Motor control logic
def move_antenna(direction, client):
    enable_pin.value(0)  # Enable motor driver (0 = enable, 1 = disable)
    dir_pin.value(direction)  # Set direction (1 = up, 0 = down)

    start_time = time.ticks_ms()  # Start the timer

    while True:
        # Monitor stop switch state based on direction
        if direction == 1:  # Raising
            if not raise_stop_pin.value():  # Stop if the raise stop pin is triggered
                print("Raise stop reached.")
                break
            if raise_trigger.value():  # Stop if the raise trigger is active
                print("Raise triggered to stop.")
                break
        elif direction == 0:  # Lowering
            if not lower_stop_pin.value():  # Stop if the lower stop pin is triggered
                print("Lower stop reached.")
                break
            if lower_trigger.value():  # Stop if the lower trigger is active
                print("Lower triggered to stop.")
                break

        # Check if 1.5 seconds have passed
        if time.ticks_ms() - start_time > 1500:  # 1500 milliseconds = 1.5 seconds
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
    
    # After completing the movement, send the state update
    if direction == 1:  # If the direction is "Raise"
        send_state_update("Raised", client)
    else:  # If the direction is "Lower"
        send_state_update("Lowered", client)

# Main Program
def main():
    print("Starting program...")

    # Connect to Wi-Fi
    connect_wifi()

    # Connect to MQTT broker
    client = connect_mqtt()

    # Keep the script running to listen for MQTT messages
    try:
        while True:
            client.wait_msg()  # Wait for new messages
    except KeyboardInterrupt:
        print("Exiting program...")
        client.disconnect()

# Start the main function
if __name__ == "__main__":
    main()

