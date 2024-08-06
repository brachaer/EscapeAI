from flask import Blueprint, jsonify, send_from_directory

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the API"})

@main.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200
