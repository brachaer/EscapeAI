from bson import ObjectId
from app.models import GameState
from app.utils import translate, validate_language, extract_description_and_options
from app.language_chains import generate_room_description, process_user_action
from flask_socketio import emit

DEFAULT_LANG = "en"

game_state = GameState()

def save_initial_game_state(data, description, options):
    return game_state.save_state({
        **data,
        "current_state": description,
        "options": options
    }).inserted_id

def get_validated_state_id(state_id):
    if isinstance(state_id, str):
        try:
            return ObjectId(state_id)
        except Exception as e:
            print(f"ObjectId conversion error: {e}")
            return None
    return state_id

def start_game(data):
    lang = validate_language(data.get('lang', DEFAULT_LANG).lower())
    
    room_description = generate_room_description({
        "name": data.get('name'),
        "theme": data.get('theme'),
        "difficulty": data.get('difficulty')
    }, lang)
        
    description, options = extract_description_and_options(room_description)
    state_id = save_initial_game_state({
        "lang": lang,
        "name": data.get('name'),
        "theme": data.get('theme'),
        "difficulty": data.get('difficulty')
    }, description, options)

    return {
        "message": translate("welcome", lang),
        "description": description,
        "options": options,
        "state_id": str(state_id)
    }

def emit_game_update(result):
    emit('game_update', result)

def process_action(data):
    state_id = get_validated_state_id(data.get('state_id'))
    lang = data.get('lang')

    if not state_id:
        print("Invalid state_id received:", data.get('state_id'))
        return {"error": "Invalid state_id format"}, 400

    current_state = game_state.get_state(state_id)
    if not current_state:
        return {"error": "Invalid state_id"}, 400
    
    chosen_option = next((opt for opt in current_state['options'] if opt['id'] == data.get('choice')), None)
    if not chosen_option:
        print(f"Invalid choice received: {data.get('choice')} for state_id: {state_id}")
        return {"error": "Invalid choice"}, 400

    if chosen_option and chosen_option['is_exit']:
        result = {
            "description": translate("exit", lang),
            "options": [],
            "exit": True
        }
       # emit_game_update(result)
        return result

    result = process_user_action({
        "name": current_state['name'],
        "current_state": current_state['current_state'],
        "options": current_state['options'],
        "choice": data.get('choice'),
        "theme": current_state['theme'],
        "difficulty": current_state['difficulty']
    }, lang)
    
    new_description, new_options = extract_description_and_options(result)

    game_state.update_state(state_id, {
        "current_state": new_description,
        "options": new_options
    })

    result = {
        "description": new_description,
        "options": new_options,
        "exit": False
    }
    #emit_game_update(result)
    return result
