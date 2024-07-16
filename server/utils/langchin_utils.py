import os
from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

def create_game_stages(user_data):
    prompt_template = """
    Act as an expert game creator and create game stages based on the following user data:
    Name: {name}
    Theme: {theme}
    Number of Stages: {numStages}
    Difficulty: {difficulty}
    Language: {language}

    Create each stage with the following components:
    - Title
    - Description
    - Question
    - Options (4 options, one correct)
    - Correct Option Index

    Ensure the stages align with the chosen theme and difficulty level. Incorporate the user's name into the narrative where appropriate. Design each stage to provide a challenging and engaging experience for the player.
    """

    llm = ChatOpenAI(
        model="gpt-4",
        temperature=0.7,
        openai_api_key=OPENAI_API_KEY
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a world-class game creator."),
        ("user", prompt_template)
    ])

    output_parser = StrOutputParser()

    chain = LLMChain(
        llm=llm,
        prompt=prompt,
        output_parser=output_parser
    )

    response = chain.run(name=user_data['name'], theme=user_data['theme'], numStages=user_data['numStages'], difficulty=user_data['difficulty'], language=user_data['language'])
    
    stages = response.strip()  
    return stages
