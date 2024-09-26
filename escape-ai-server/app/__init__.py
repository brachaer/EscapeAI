from flask import Flask
from flask_cors import CORS
from config.settings import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app, origins=['http://localhost:5173', 'https://escape-ai.vercel.app'])
    
    with app.app_context():
        from app.routes import main
        app.register_blueprint(main)
    
    return app