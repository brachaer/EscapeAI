import pytest
from app.utils import validate_language, translate, extract_description_and_options, parse_options

TRANSLATIONS_MOCK = {
    'en': {'welcome': 'Welcome'},
    'he': {'welcome': 'ברוכים הבאים לחדר הבריחה'}
}

DESCRIPTION_TEXT = "This is a description."
OPTIONS_TEXT = "Option 1 | Description 1 | false\nOption 2 | Description 2 | true"
FULL_TEXT = f"{DESCRIPTION_TEXT}\n---\n{OPTIONS_TEXT}"

@pytest.mark.parametrize("lang, expected", [
    ('en', 'en'),
    ('he', 'he'),
    ('de', 'en'), 
])
def test_validate_language(lang, expected):
    assert validate_language(lang) == expected, f"Expected language for '{lang}' to be '{expected}'"

def test_translate(mocker):
    mocker.patch('app.utils.TRANSLATIONS', TRANSLATIONS_MOCK)
    
    assert translate('welcome', 'en') == TRANSLATIONS_MOCK['en']['welcome'], "Translation mismatch for 'en'"
    assert translate('welcome', 'he') == TRANSLATIONS_MOCK['he']['welcome'], "Translation mismatch for 'he'"

def test_extract_description_and_options():
    description, options = extract_description_and_options(FULL_TEXT)
    
    assert description == DESCRIPTION_TEXT, f"Expected description to be '{DESCRIPTION_TEXT}', got '{description}'"
    assert len(options) == 2, f"Expected 2 options, got {len(options)}"
    assert options[0]['id'] == 'Option 1', "First option ID mismatch"
    assert options[1]['is_exit'] == True, "Second option exit status mismatch"

def test_parse_options():
    options = parse_options(OPTIONS_TEXT)
    
    assert len(options) == 2, f"Expected 2 options, got {len(options)}"
    assert options[0] == {'id': 'Option 1', 'description': 'Description 1', 'is_exit': False}, "First option mismatch"
    assert options[1] == {'id': 'Option 2', 'description': 'Description 2', 'is_exit': True}, "Second option mismatch"
