from langchain_openai import OpenAIEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from config.settings import Config

embeddings = OpenAIEmbeddings()
client = MongoClient(Config.MONGO_URI)
db = client["EscapeAI"]

class GameState:
    def __init__(self):
        self.collection = db["game_state"]
        self.vector_store = MongoDBAtlasVectorSearch(self.collection, embeddings, index_name="game_state_index")


    def save_state(self, state):
        return self.collection.insert_one(state)

    def get_state(self, state_id):
        return  self.collection.find_one({"_id": state_id})

    def update_state(self, state_id, new_state):
        return self.collection.update_one({"_id": state_id}, {"$set": new_state})
    