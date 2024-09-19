from flask import Flask
from config.settings import Config
from flask_cors import CORS
app = Flask(__name__)

CORS(app, origins=['http://localhost:5173','https://escape-ai.vercel.app'])

def create_app(config_class=Config):
    app.config.from_object(config_class)
    from app.routes import main
    app.register_blueprint(main)
    
    return app