import pytest
from flask import Flask, json
from app.routes import main
from unittest.mock import patch

@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(main)
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert json.loads(response.data) == {"message": "Welcome to EscapeAI"}

@pytest.mark.parametrize("method", ['OPTIONS', 'POST'])
def test_start_game(client, method):
    with patch('app.routes.start_game') as mock_start_game:
        mock_start_game.return_value = {"game_id": "123", "initial_state": "You are in a room."}
        response = client.open('/start_game', method=method, json={})
        assert response.status_code == 200
        if method == 'POST':
            assert json.loads(response.data) == {"game_id": "123", "initial_state": "You are in a room."}
        else:  # OPTIONS
            assert json.loads(response.data) == {'message': 'Game started!'}

def test_game_action(client):
    with patch('app.routes.process_action') as mock_process_action:
        mock_process_action.return_value = {"action_result": "You opened the door."}
        response = client.post('/game_action', json={"action": "open door"})
        assert response.status_code == 200
        assert json.loads(response.data) == {"action_result": "You opened the door."}

def test_start_game_error(client):
    with patch('app.routes.start_game', side_effect=Exception("Test error")):
        response = client.post('/start_game', json={})
        assert response.status_code == 500
        assert json.loads(response.data) == {"error": "Internal server error"}

def test_game_action_error(client):
    with patch('app.routes.process_action', side_effect=Exception("Test error")):
        response = client.post('/game_action', json={"action": "invalid"})
        assert response.status_code == 500
        assert json.loads(response.data) == {"error": "Internal server error"}