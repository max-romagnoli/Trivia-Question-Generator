from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS  # Comment out for deployment
from api.HelloApiHandler import HelloApiHandler
from api.TriviaApiHandler import TriviaApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')  # add ref to frontend subdirectory
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app_data.db'
# CORS(app)  # Comment out for deployment
api = Api(app)


@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')  # retrieves react index from fe folder


api.add_resource(TriviaApiHandler, '/triviaquestion')
api.add_resource(HelloApiHandler, '/flask/hello')