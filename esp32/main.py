from machine import Pin
import time

class AntennaStopException(Exception):
    pass

def monitor_stop_switch(pin):
    if not pin.value():  # Check if pin is low
        raise AntennaStopException("Stop position reached!")

def wait_for_trigger(trigger_pin):
    print("Waiting for trigger...")
    while not trigger_pin.value():  # Stay in loop until trigger pin goes high
        time.sleep(0.1)
    print("Trigger detected!")

def move_antenna(step_pin, dir_pin, stop_switch, direction):
    enable_pin.value(0)  # Enable motor driver (0 = enable, 1 = disable)
    dir_pin.value(direction)  # Set direction (1 = up, 0 = down)
    try:
        while True:
            # Check the stop switch state
            monitor_stop_switch(stop_switch)

            # Pulse the step pin to move the motor
            step_pin.value(1)
            time.sleep_us(500)  # Adjust pulse width as needed
            step_pin.value(0)
            time.sleep_us(300)  # Adjust delay for speed control

    except AntennaStopException as e:
        print(e)
        print(f"Antenna {'raised' if direction == 1 else 'lowered'}. Stopping motor.")
        
    finally:
        enable_pin.value(1)  # Disable motor driver (1 = disable)

# Pin setup
step_pin = Pin(7, Pin.OUT)  # Replace with your step pin number
dir_pin = Pin(6, Pin.OUT)   # Replace with your direction pin number
enable_pin = Pin(5, Pin.OUT)  # Enable pin for motor driver
raise_trigger = Pin(9, Pin.IN, Pin.PULL_DOWN)  # Trigger pin for raising
lower_trigger = Pin(10, Pin.IN, Pin.PULL_DOWN)  # Trigger pin for lowering
raise_stop = Pin(17, Pin.IN, Pin.PULL_UP)  # Stop switch for raising
lower_stop = Pin(18, Pin.IN, Pin.PULL_UP)  # Stop switch for lowering

# Initial motor pin states
step_pin.value(0)
dir_pin.value(0)

# Main Program
while True:
    # Wait for the raise trigger
    print("Ready to raise antenna.")
    wait_for_trigger(raise_trigger)
    move_antenna(step_pin, dir_pin, raise_stop, direction=1)  # Raise antenna

    # Wait for the lower trigger
    print("Ready to lower antenna.")
    wait_for_trigger(lower_trigger)
    move_antenna(step_pin, dir_pin, lower_stop, direction=0)  # Lower antenna

