import RPi.GPIO as GPIO
import time
import sys

import signal
import sys

# Clean up GPIO resources on Ctrl+C
def signal_handler(sig, frame):
    print("\nCtrl+C signal sensed!\nCleaning up GPIO pins...")

    for el in gout:
        GPIO.output(el, GPIO.LOW)

    GPIO.cleanup()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

# setup GPIO using Board numbering
GPIO.setmode(GPIO.BOARD)

delay = [0, 0]
start = [-1, 0]

gout = [10, 12]

gin = [3, 5]

# Set pins to be an output pin
for el in gout:
    # print("Setting pin {} to ouput...".format(el))
    GPIO.setup(el, GPIO.OUT)
    GPIO.output(el, GPIO.LOW)

# Set pins to be an input pin and set initial value to be pulled low (off)
for el in gin:
    # print("Setting pin {} to input...".format(el))
    GPIO.setup(el, GPIO.IN, pull_up_down=GPIO.PUD_UP)


while(True):
    for i in range(len(gin)):
        if GPIO.input(gin[i]) == GPIO.LOW:
            # print("Button {} was pushed!".format(gin[i]))
            GPIO.output(gout[i], GPIO.HIGH)
            if start[i] != -1:
                delay[i] = start[i] = time.time()
        else:
            # print("{} vs {}: {}".format(delay[i], start[i], delay[i] - start[i]))
            if start[i] == -1:
                GPIO.output(gout[i], GPIO.LOW)
            else:
                if delay[i] - start[i] >= 3:
                    GPIO.output(gout[i], GPIO.LOW)
                    delay[i] = start[i] = 0
                elif delay[i]:
                    delay[i] = time.time()

    time.sleep(.1)
