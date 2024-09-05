from flask_socketio import emit, disconnect
from app.game_logic import start_game, process_action

def register_socket_events(socketio):
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')

    @socketio.on('start_game')
    def handle_start_game(data):
        game_data = start_game(data)
        emit('game_started', game_data)

    @socketio.on('game_action')
    def handle_game_action(data):
        result = process_action(data)
        emit('action_result', result)

    @socketio.on('end_game')
    def handle_end_game():
        emit('game_ended', {'message': 'Game has ended'})
        disconnect()  
        print('Game ended, client disconnected')
        
    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')