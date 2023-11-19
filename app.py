# main file

import os
from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from flask_session import Session
from tempfile import mkdtemp
from api.LoginApiHandler import LoginResource, GetUserResource

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
# Config for session to use tempfiles so we don't need to have an api key
app.config['SESSION_TYPE'] = 'filesystem'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_FILE_DIR"] = mkdtemp()
Session(app)
api = Api(app)

# Add the resources to the API for LoginApiHandler
api.add_resource(LoginResource, '/login')
api.add_resource(GetUserResource, '/get_user')

@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()
