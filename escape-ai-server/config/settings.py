import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    MONGO_URI = os.environ.get("MONGO_URI")
    MODEL_NAME = "gpt-4o-mini"
    TEMPERATURE = 0.7
    
