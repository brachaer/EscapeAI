from langchain_openai import ChatOpenAI
from config.settings import Config
from temps.prompts import ROOM_TEMPLATES, ACTION_TEMPLATES, END_GAME_TEMPLATES

llm = ChatOpenAI(model=Config.MODEL_NAME, temperature=Config.TEMPERATURE)

ROOM_CHAINS = {lang: ROOM_TEMPLATES[lang] | llm for lang in ROOM_TEMPLATES}
ACTION_CHAINS = {lang: ACTION_TEMPLATES[lang] | llm for lang in ACTION_TEMPLATES}
END_GAME_CHAINS = {lang: END_GAME_TEMPLATES[lang] | llm for lang in END_GAME_TEMPLATES}

DEFAULT_LANG = 'en'

def get_chain(chains, lang):
    return chains.get(lang, chains.get(DEFAULT_LANG))

def generate_room_description(data, lang):
    chain = get_chain(ROOM_CHAINS, lang)
    if chain is None:
        raise ValueError(f"No chain available for language '{lang}' or default language")
    return chain.invoke(data).content

def process_user_action(data, lang):
    chain = get_chain(ACTION_CHAINS, lang)
    if chain is None:
        raise ValueError(f"No chain available for language '{lang}' or default language")
    return chain.invoke(data).content

def process_game_exit(data, lang):
    chain = get_chain(END_GAME_CHAINS, lang)
    if chain is None:
        raise ValueError(f"No chain available for language '{lang}' or default language")
    return chain.invoke(data).content