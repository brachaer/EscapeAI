from flask import Blueprint,request, jsonify

from app.game_logic import start_game, process_action

main = Blueprint('main', __name__)
import logging

logging.basicConfig(level=logging.DEBUG)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to EscapeAI"})

@main.route('/start_game', methods=['OPTIONS', 'POST'])
def handle_start_game():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Game started!'}), 200
    try:
        data = request.json
        game_data = start_game(data)  
        return jsonify(game_data), 200
    except Exception as e:
        logging.error(f"Error starting game: {e}")
        return jsonify({"error": "Internal server error"}), 500

@main.route('/game_action', methods=['POST'])
def handle_game_action():
    try:
        data = request.json
        print(f"Received data: {data}")  
        result = process_action(data)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error processing game action: {e}")
        return jsonify({"error": "Internal server error"}), 500

