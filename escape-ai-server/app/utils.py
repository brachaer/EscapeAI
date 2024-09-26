from static.translations import TRANSLATIONS

def translate(key, lang):
    return TRANSLATIONS.get(lang, TRANSLATIONS["en"]).get(key, TRANSLATIONS["en"][key])

def validate_language(lang):
    return lang if lang in TRANSLATIONS else "en"

def extract_description_and_options(text):
    SEPARATOR = '---'
    lines = text.strip().split('\n')

    if SEPARATOR in lines:
        separator_index = lines.index(SEPARATOR)
        description = '\n'.join(lines[:separator_index])
        options_text = '\n'.join(lines[separator_index + 1:])
    else:
        description = '\n'.join(lines[:3])
        options_text = '\n'.join(lines[3:])

    return description, parse_options(options_text)

def parse_options(options_text):
    options = []
    for line in options_text.split('\n'):
        if '|' in line:
            parts = line.split('|')
            if len(parts) == 3:
                id, description, is_exit = map(str.strip, parts)
                options.append({
                    'id': id,
                    'description': description,
                    'is_exit': is_exit.lower() == 'true'
                })
    return options