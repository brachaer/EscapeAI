from flask import Blueprint,request, jsonify

from app.game_logic import start_game, process_action

main = Blueprint('main', __name__)
import logging

logging.basicConfig(level=logging.DEBUG)

@main.route('/')
def index():
    logging.debug("logging test")

    return jsonify({"message": "Welcome to EscapeAI"})

@main.route('/start_game', methods=['OPTIONS', 'POST'])
def handle_start_game():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.json
    game_data = start_game(data)
    return jsonify(game_data), 200

@main.route('/game_action', methods=['POST'])
def handle_game_action():
    data = request.json
    result = process_action(data)
    return jsonify(result), 200