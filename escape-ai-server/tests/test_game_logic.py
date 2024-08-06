import pytest
from bson import ObjectId
from app.game_logic import start_game, process_action, get_validated_state_id

VALID_OBJECT_ID = ObjectId()
INVALID_OBJECT_ID = "invalid_id"

@pytest.mark.parametrize("input_id, expected", [
    (str(VALID_OBJECT_ID), VALID_OBJECT_ID),
    (VALID_OBJECT_ID, VALID_OBJECT_ID),
    (INVALID_OBJECT_ID, None)
])
def test_get_validated_state_id(input_id, expected):
    assert get_validated_state_id(input_id) == expected, f"Expected {expected} for input {input_id}"

@pytest.mark.parametrize("data", [
    {"name": "Player", "theme": "Fantasy", "difficulty": "Easy", "lang": "en"},
    {"name": "Spieler", "theme": "Sci-Fi", "difficulty": "Hard", "lang": "de"},
])
def test_start_game(app, mocker, data):
    mocker.patch('app.game_logic.generate_room_description', return_value="Room description")
    mocker.patch('app.game_logic.extract_description_and_options', return_value=("Description", [{"id": "1", "description": "Option 1", "is_exit": False}]))
    mocker.patch('app.game_logic.save_initial_game_state', return_value=ObjectId())
    
    with app.app_context():
        result = start_game(data)
    
    assert all(key in result for key in ["message", "description", "options", "state_id"]), "Missing keys in start_game result"

# @pytest.mark.parametrize("data, expected", [
#     (
#         {"state_id": str(VALID_OBJECT_ID), "lang": "en", "choice": "1"},
#         {"description": "New description", "options": [], "exit": False}
#     ),
#     (
#         {"state_id": str(VALID_OBJECT_ID), "lang": "en", "choice": "exit"},
#         {"description": "Congratulations, You've escaped the room.", "options": [], "exit": True}
#     ),
# ])
# def test_process_action(app, mocker, data, expected):
#     mocker.patch('app.game_logic.get_validated_state_id', return_value=VALID_OBJECT_ID)
#     mocker.patch('app.game_logic.game_state.get_state', return_value={
#         "name": "Player",
#         "current_state": "Current state",
#         "options": [{"id": "1", "description": "Option 1", "is_exit": False}, {"id": "exit", "description": "Exit", "is_exit": True}],
#         "theme": "Fantasy",
#         "difficulty": "Easy"
#     })
#     mocker.patch('app.game_logic.process_user_action', return_value="New description")
#     mocker.patch('app.game_logic.extract_description_and_options', return_value=("New description", []))
    
#     with app.app_context():
#         result = process_action(data)
    
#     assert result == expected, f"Expected result to be {expected}, got {result}"

@pytest.mark.parametrize("data, expected", [
    (
        {"state_id": str(VALID_OBJECT_ID), "lang": "en", "choice": "1"},
        {"description": "New description", "options": [], "exit": False}
    ),
    (
        {"state_id": str(VALID_OBJECT_ID), "lang": "en", "choice": "exit"},
        {"description": "Congratulations, You've escaped the room.", "options": [], "exit": True}
    ),
])
def test_process_action(app, mocker, data, expected):
    mocker.patch('app.game_logic.get_validated_state_id', return_value=VALID_OBJECT_ID)
    mocker.patch('app.game_logic.game_state.get_state', return_value={
        "name": "Player",
        "current_state": "Current state",
        "options": [{"id": "1", "description": "Option 1", "is_exit": False}, {"id": "exit", "description": "Exit", "is_exit": True}],
        "theme": "Fantasy",
        "difficulty": "Easy"
    })
    mocker.patch('app.game_logic.process_user_action', return_value="New description")
    mocker.patch('app.game_logic.extract_description_and_options', return_value=("New description", []))
    mocker.patch('app.game_logic.emit_game_update')  

    with app.app_context():
        result = process_action(data)
    
    assert result == expected, f"Expected result to be {expected}, got {result}"
