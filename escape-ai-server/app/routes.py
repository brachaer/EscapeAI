from flask import Blueprint, request, jsonify
from app.game_logic import start_game, process_action

main = Blueprint('main', __name__)

@main.route('/start', methods=['POST'])
def start():
    data = request.json
    required_fields = ['lang', 'name', 'theme', 'difficulty']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    return jsonify(start_game(data))

@main.route('/action', methods=['POST'])
def action():
    data = request.json
    required_fields = ['state_id', 'choice', 'lang']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    return jsonify(process_action(data))