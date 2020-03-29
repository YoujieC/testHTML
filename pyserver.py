#!/usr/bin/env python
import asyncio
import time
import websockets
import pprint
import threading
message = None
oldMessage = None


async def send_msg(websocket, path):
    global message, oldMessage
    while True:
        if (oldMessage is None and message is not None) or \
                (oldMessage is not None and message is not None and oldMessage != message):
            await asyncio.sleep(2)
            await websocket.send(message)
            oldMessage = message


def setup_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    start_server = websockets.serve(send_msg, "127.0.0.1", 5678)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


def update_data():
    global message
    message = "First message"
    pprint.pprint(message)
    time.sleep(10)
    message = "Second message"
    pprint.pprint(message)


if __name__ == '__main__':
    serverThread = threading.Thread(target=setup_server)
    serverThread.start()
    dataThread = threading.Thread(target=update_data)
    dataThread.start()
