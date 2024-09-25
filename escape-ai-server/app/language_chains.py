from langchain_openai import ChatOpenAI
from config.settings import Config
from temps.prompts import ROOM_TEMPLATES, ACTION_TEMPLATES, END_GAME_TEMPLATES

llm = ChatOpenAI(model=Config.MODEL_NAME, temperature=Config.TEMPERATURE)

ROOM_CHAINS = {lang: ROOM_TEMPLATES[lang] | llm for lang in ROOM_TEMPLATES}
ACTION_CHAINS = {lang: ACTION_TEMPLATES[lang] | llm for lang in ACTION_TEMPLATES}
END_GAME_CHAINS = {lang: END_GAME_TEMPLATES[lang] | llm for lang in END_GAME_TEMPLATES}

def generate_room_description(data, lang):
    chain = ROOM_CHAINS.get(lang)
    if chain is None:
        raise ValueError(f"No chain available for language '{lang}'")
    return chain.invoke(data).content

def process_user_action(data, lang):
    chain = ACTION_CHAINS.get(lang)
    if chain is None:
        raise ValueError(f"No chain available for language '{lang}'")
    return chain.invoke(data).content

def process_game_exit(data, lang):
    chain = END_GAME_CHAINS.get(lang) 
    if chain is None:
        raise ValueError(f"No chain available for language '{lang}'")
    return chain.invoke(data).content




