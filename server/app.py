import os
from flask import Flask
from routes.generate_game_stages import generate_game_stages_bp
from config import config

app = Flask(__name__)
env = os.getenv("FLASK_ENV", "development")
app.config.from_object(config[env])

app.register_blueprint(generate_game_stages_bp)

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])
