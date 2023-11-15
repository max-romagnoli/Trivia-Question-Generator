# app.py
#import os
from flask import Flask, send_from_directory, session, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_session import Session
from api.HelloApiHandler import *

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
api = Api(app)

# Set the secret key
#app.config['SECRET_KEY'] = os.urandom(24)

Session(app)



api.add_resource(HelloApiHandler, '/flask/hello')
api.add_resource(LoginApiHandler, '/flask/login')

@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

#@app.route('/test')
#def test():
   # return jsonify({'message': 'Test endpoint'})

if __name__ == '__main__':
    app.run(debug=True)
