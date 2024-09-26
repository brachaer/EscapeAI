import unittest
from unittest.mock import MagicMock
from app.game_logic import start_game, process_action
from app.models import GameState

class TestGameFunctions(unittest.TestCase):
    
    def setUp(self):
        self.mock_game_state = MagicMock(spec=GameState)
        self.mock_game_state.get_state.return_value = {
            'name': 'Player1',
            'current_state': 'You find yourself in a dimly lit room.',
            'theme': 'dark',
            'difficulty': 'easy',
            'options': [{'id': 'valid_choice', 'is_exit': False}]
        }
        self.mock_game_state.save_state.return_value.inserted_id = '60c72b2f5f8c8a1c88d6e23e' 
        self.mock_game_state.update_state.return_value = True

    def test_process_action_invalid_choice(self):
        data = {
            'state_id': '60c72b2f5f8c8a1c88d6e23e',  
            'choice': 'invalid_choice',
            'lang': 'en'
        }
        result = process_action(data)
        self.assertEqual(result, {'error': 'Invalid choice'}, "Expected error for invalid choice")

    def test_process_action_invalid_state_id(self):
        data = {
            'state_id': 'invalid_state_id',
            'choice': 'valid_choice',
            'lang': 'en'
        }
        result = process_action(data)
        self.assertEqual(result, {'error': 'Invalid state_id format'}, "Expected error for invalid state_id format")

    def test_process_action_with_valid_state(self):
        data = {
            'state_id': '60c72b2f5f8c8a1c88d6e23e', 
            'choice': 'valid_choice',
            'lang': 'en'
        }
        result = process_action(data)
        self.assertIn('description', result, "Expected description in valid choice result")

    def test_start_game_success(self):
        data = {
            'name': 'Player1',
            'theme': 'dark',
            'difficulty': 'easy',
            'lang': 'en'
        }
        result = start_game(data)
        self.assertIn('description', result, "Expected description in start game result")
        self.assertEqual(result['description'], 'Expected updated description here.', "Expected specific description")

if __name__ == '__main__':
    unittest.main()