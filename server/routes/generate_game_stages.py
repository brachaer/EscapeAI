from flask import Blueprint, request, jsonify
from utils.langchin_utils import create_game_stages

generate_game_stages_bp = Blueprint('generate_game_stages', __name__)

@generate_game_stages_bp.route('/api/generate_game_stages', methods=['POST'])

def generate_game_stages_route():
    user_data = request.json
    try:
        stages = create_game_stages(user_data)
        return jsonify({"stages": stages}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
