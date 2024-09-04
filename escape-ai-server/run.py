from app import create_app

app = create_app()

if __name__ == '__main__':
    from flask_socketio import SocketIO
    socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5173"])
    socketio.run(app, debug=True)
