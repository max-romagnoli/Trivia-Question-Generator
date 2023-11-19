# LoginApiHandler.py

from flask import request, session
from flask_restful import Resource

class LoginResource(Resource):
    def post(self):
        if request.is_json:
            data = request.get_json()
            name = data.get('Name', '')

            # Store the name in the session
            session['Name'] = name

            response_data = {"message": "Login successful", "Name": name}
            return response_data
        else:
            return {"error": "Invalid JSON in the request"}, 400

class GetUserResource(Resource):
    def get(self):
        # Retrieve the name from the session
        name = session.get('Name', '')
        return {"Name": name}
