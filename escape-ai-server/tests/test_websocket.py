import socketio
import asyncio
import pytest

sio = socketio.AsyncClient()
state_id = None

@sio.event
async def connect():
    pass  

@sio.event
async def disconnect():
    pass  

@sio.event
async def game_started(data):
    global state_id
    state_id = data['state_id']
    await sio.emit('game_action', {'state_id': state_id, 'choice': data['options'][0]['id'], 'lang': 'en'})

@sio.event
async def action_result(data):
    if not data['exit']:
        await sio.emit('game_action', {'state_id': state_id, 'choice': data['options'][0]['id'], 'lang': 'en'})
    else:
        await sio.emit('end_game') 

@sio.event
async def game_ended(data):
    await sio.disconnect()

@pytest.mark.asyncio
async def test_game_flow():
    await sio.connect('http://localhost:5000')
    await sio.emit('start_game', {'lang': 'en', 'name': 'TestPlayer', 'theme': 'space', 'difficulty': 'medium'})
    await asyncio.sleep(1)  
    assert sio.connected
    await sio.disconnect()

if __name__ == '__main__':
    asyncio.run(test_game_flow())
