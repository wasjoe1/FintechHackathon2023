#!/home/pi/door_py/venv/bin/python
import RPi.GPIO as GPIO
import time
import sys


if len(sys.argv) < 2: exit(1)

GPIO.setmode(GPIO.BOARD)

GPIO.setup(11,GPIO.OUT)
servo = GPIO.PWM(11,50)

servo.start(0)

duty = int(sys.argv[1])
servo.ChangeDutyCycle(duty)
time.sleep(1)

servo.stop()
GPIO.cleanup()
