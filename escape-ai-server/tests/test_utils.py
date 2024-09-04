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
    assert validate_language(lang) == expected

def test_translate(mocker):
    mocker.patch('app.utils.TRANSLATIONS', TRANSLATIONS_MOCK)
    assert translate('welcome', 'en') == TRANSLATIONS_MOCK['en']['welcome']
    assert translate('welcome', 'he') == TRANSLATIONS_MOCK['he']['welcome']

@pytest.mark.parametrize("full_text, expected_description, expected_options", [
    (FULL_TEXT, DESCRIPTION_TEXT, [
        {'id': 'Option 1', 'description': 'Description 1', 'is_exit': False},
        {'id': 'Option 2', 'description': 'Description 2', 'is_exit': True}
    ]),
])
def test_extract_description_and_options(full_text, expected_description, expected_options):
    description, options = extract_description_and_options(full_text)
    assert description == expected_description
    assert len(options) == len(expected_options)
    for option, expected in zip(options, expected_options):
        assert option == expected

def test_parse_options():
    options = parse_options(OPTIONS_TEXT)
    assert len(options) == 2
    assert options[0] == {'id': 'Option 1', 'description': 'Description 1', 'is_exit': False}
    assert options[1] == {'id': 'Option 2', 'description': 'Description 2', 'is_exit': True}
