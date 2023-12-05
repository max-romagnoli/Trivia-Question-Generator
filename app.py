from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
#from flask_cors import CORS  # Comment out for deployment
from flask_sqlalchemy import SQLAlchemy
import os
try:
    from .api.HelloApiHandler import HelloApiHandler
    from .api.TriviaApiHandler import TriviaApiHandler
    from .api.ScoresApiHandler import ScoresApiHandler
    from .api.RegisterApiHandler import RegisterApiHandler

except ImportError:
    from api.HelloApiHandler import HelloApiHandler
    from api.TriviaApiHandler import TriviaApiHandler
    from api.ScoresApiHandler import ScoresApiHandler
    from api.RegisterApiHandler import RegisterApiHandler


# initialise Flask app
app = Flask(__name__, static_url_path='', static_folder='frontend/build')  # add ref to frontend subdirectory
api = Api(app)
#CORS(app)  # Comment out for deployment

# initialise database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app_data.db'
db = SQLAlchemy(app)
if not os.path.exists('app_data.db'):
    with app.app_context():
        try:
            from .models import *
        except ImportError:
            from models import *
        db.drop_all()
        db.create_all()


@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')  # retrieves react index from fe folder


# Add here ref to API implementations
api.add_resource(TriviaApiHandler, '/triviaquestion')
api.add_resource(HelloApiHandler, '/flask/hello')
api.add_resource(ScoresApiHandler, '/scores')
api.add_resource(RegisterApiHandler, '/register')


