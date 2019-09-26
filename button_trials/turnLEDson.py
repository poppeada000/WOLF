import RPi.GPIO as GPIO
import time

import signal
import sys

# Clean up GPIO resources on Ctrl+C
def signal_handler(sig, frame):
    print("\nCtrl+C signal sensed!\nCleaning up GPIO pins...")
    GPIO.output(12, GPIO.LOW)
    GPIO.output(8, GPIO.LOW)
    GPIO.cleanup()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

ledPins = [12, 8]
butPins = [10, 5]


# setup GPIO using Board numbering
GPIO.setmode(GPIO.BOARD)

# Set pins for controlling the MOSFETs
for num in ledPins:
    GPIO.setup(num, GPIO.OUT)

 # Set pins to be an input pin and set initial value to be pulled low (off)
for num in butPins:
    GPIO.setup(num, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

start = time.time()


while(True):
    finish = time.time()

    for i in range(len(butPins)):
        if GPIO.input(butPins[i]) == GPIO.HIGH:
            print("Button {} was pushed!".format(butPins[i]))
            GPIO.output(ledPins[i], GPIO.HIGH)
        else:
            print("No button pressed...")
            GPIO.output(ledPins[i], GPIO.LOW)
    

    print("Time: {0:06.0f}s...".format(finish-start))

    time.sleep(.001)
