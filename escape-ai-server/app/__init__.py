from flask import Flask
from flask_socketio import SocketIO
from config.settings import Config
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5173"]) 

def create_app(config_class=Config):
    app.config.from_object(config_class)

    socketio.init_app(app)

    from app.routes import main
    app.register_blueprint(main)

    from app.socket_events import register_socket_events
    register_socket_events(socketio)
    
    return app
