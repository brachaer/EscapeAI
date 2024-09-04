import pytest
from app.language_chains import generate_room_description, process_user_action

MOCK_ROOM_DESCRIPTION = "Mocked room description"
MOCK_ACTION_RESULT = "Mocked action result"

room_test_data = [
    ({"name": "Player", "theme": "Fantasy", "difficulty": "Easy"}, "en"),
    ({"name": "Spieler", "theme": "Sci-Fi", "difficulty": "Hard"}, "he"),
    ({"name": "John", "theme": "Tech", "difficulty": "Medium"}, "de"),
]

action_test_data = [
    ({"name": "Player", "current_state": "Current state", "options": [], "choice": "1", "theme": "Fantasy", "difficulty": "Easy"}, "en"),
    ({"name": "Spieler", "current_state": "Aktueller Zustand", "options": [], "choice": "2", "theme": "Sci-Fi", "difficulty": "Hard"}, "de"),
]

@pytest.fixture
def mock_chains(mocker):
    room_chain = mocker.Mock()
    room_chain.invoke.return_value.content = MOCK_ROOM_DESCRIPTION
    action_chain = mocker.Mock()
    action_chain.invoke.return_value.content = MOCK_ACTION_RESULT
    mocker.patch('app.language_chains.ROOM_CHAINS', {'en': room_chain, 'he': room_chain, 'de': room_chain})
    mocker.patch('app.language_chains.ACTION_CHAINS', {'en': action_chain, 'de': action_chain})
    return room_chain, action_chain

@pytest.mark.parametrize("data, lang", room_test_data)
def test_generate_room_description(mocker, mock_chains, data, lang):
    room_chain, _ = mock_chains
    
    result = generate_room_description(data, lang)
    
    assert result == MOCK_ROOM_DESCRIPTION, f"Expected '{MOCK_ROOM_DESCRIPTION}', got '{result}'"
    room_chain.invoke.assert_called_once_with(data)

@pytest.mark.parametrize("data, lang", action_test_data)
def test_process_user_action(mocker, mock_chains, data, lang):
    _, action_chain = mock_chains
    
    result = process_user_action(data, lang)
    
    assert result == MOCK_ACTION_RESULT, f"Expected '{MOCK_ACTION_RESULT}', got '{result}'"
    action_chain.invoke.assert_called_once_with(data)
