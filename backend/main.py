import io
import threading

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from picamera2 import Picamera2
from picamera2.encoders import MJPEGEncoder
from picamera2.outputs import FileOutput
from gpiozero import Motor

# --- Motors ---
motor_left = Motor(forward=23, backward=22, enable=13, pwm=True)
motor_right = Motor(forward=27, backward=17, enable=12, pwm=True)

SPEED = 0.8
TURN_SPEED = SPEED * 0.5


def cmd_forward():
    motor_left.forward(SPEED)
    motor_right.forward(SPEED)


def cmd_backward():
    motor_left.backward(SPEED)
    motor_right.backward(SPEED)


def cmd_left():
    motor_left.backward(SPEED)
    motor_right.forward(SPEED)


def cmd_right():
    motor_left.forward(SPEED)
    motor_right.backward(SPEED)


def cmd_forward_left():
    motor_left.forward(TURN_SPEED)
    motor_right.forward(SPEED)


def cmd_forward_right():
    motor_left.forward(SPEED)
    motor_right.forward(TURN_SPEED)


def cmd_backward_left():
    motor_left.backward(TURN_SPEED)
    motor_right.backward(SPEED)


def cmd_backward_right():
    motor_left.backward(SPEED)
    motor_right.backward(TURN_SPEED)


def cmd_stop():
    motor_left.stop()
    motor_right.stop()


COMMANDS = {
    "forward": cmd_forward,
    "backward": cmd_backward,
    "left": cmd_left,
    "right": cmd_right,
    "forward-left": cmd_forward_left,
    "forward-right": cmd_forward_right,
    "backward-left": cmd_backward_left,
    "backward-right": cmd_backward_right,
    "stop": cmd_stop,
}


# --- Camera ---
class StreamingOutput(io.BufferedIOBase):
    def __init__(self):
        self.frame = None
        self.condition = threading.Condition()

    def write(self, buf):
        with self.condition:
            self.frame = buf
            self.condition.notify_all()


output = StreamingOutput()
picam2 = Picamera2()
picam2.configure(
    picam2.create_video_configuration(main={"size": (640, 480)})
)
picam2.start_recording(MJPEGEncoder(), FileOutput(output))


# --- App ---
app = FastAPI()


@app.get("/video")
def video():
    def generate():
        while True:
            with output.condition:
                output.condition.wait()
                frame = output.frame
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
            )

    return StreamingResponse(
        generate(),
        media_type="multipart/x-mixed-replace;boundary=frame",
    )


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            command = await websocket.receive_text()
            if command in COMMANDS:
                COMMANDS[command]()
    except WebSocketDisconnect:
        cmd_stop()


app.mount(
    "/",
    StaticFiles(directory="static", html=True),
    name="static",
)
