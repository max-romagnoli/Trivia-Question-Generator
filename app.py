import os
from flask import Flask, jsonify, request, session, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from flask_session import Session
from tempfile import mkdtemp

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
# Config for session to use tempfiles so we don't need to have an api key
app.config['SESSION_TYPE'] = 'filesystem'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_FILE_DIR"] = mkdtemp()
Session(app)
api = Api(app)


@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

# Route for handling the login page logic
@app.route('/login', methods=['POST'])
def login():
    if request.is_json:
        data = request.get_json()
        name = data.get('Name', '')
        
        # Store the name in the session
        session['Name'] = name

        response_data = {"message": "Login successful", "Name": name}
        return jsonify(response_data)
    else:
        return jsonify({"error": "Invalid JSON in the request"}), 400
    
@app.route('/get_user', methods=['GET'])
def get_user():
    # Retrieve the name from the session
    name = session.get('Name', '')
    return jsonify({"Name": name})

if __name__ == '__main__':
    app.run()
