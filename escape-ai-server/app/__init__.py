from flask import Flask
from flask_socketio import SocketIO
from config.settings import Config
from flask_cors import CORS

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, supports_credentials=True)

    socketio = SocketIO(app, async_mode='threading', cors_allowed_origins=["http://localhost:5173"], supports_credentials=True, logger=True, engineio_logger=True)
    socketio.init_app(app)

    from app.routes import main
    app.register_blueprint(main)

    from app.socket_events import register_socket_events
    register_socket_events(socketio)
    
    return app

app = create_app()