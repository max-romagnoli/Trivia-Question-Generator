# HelloApiHandler.py
from flask_restful import Api, Resource, reqparse
from flask import jsonify, session

class HelloApiHandler(Resource):
    def get(self):
        return {
            'response': "SUCCESS",
            'message': "Hello World!"
        }
# LoginApiHandler.py
class LoginApiHandler(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Name', type=str, required=True, help='Name cannot be blank')
        args = parser.parse_args()

        name = args['Name']

        # Store the user's name in session
        session['user_name'] = name
        
        response = {
            'message': 'Login Succesfull',
            'user_name':name
        }

        return jsonify(response), 201
