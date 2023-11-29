from flask import request, session
from flask_restful import Resource
from werkzeug.security import check_password_hash, generate_password_hash

class RegisterApiHandler(Resource):
    def post(self):
        if request.is_json:
            data = request.get_json()
            username = data.get('Username', '') 
            password = data.get('Password','')

            # Check if the 'Name' field is blank
            if not username:
                return {"error": "Username cannot be blank"}, 400
            
            # Store the username in the session
            session['Username'] = username
            
            try:
                from ..models import User
                from ..app import db
            except ImportError:
                from models import User
                from app import db
            
            # Save the user to the database
            user = User(username,password)
            db.session.add(user)
            db.session.commit()

            response_data = {"message": "Login successful", "Username": username}
            return response_data
        else:
            return {"error": "Invalid JSON in the request"}, 400

# class GetUserResource(Resource):
#     def get(self):
#           # Retrieve the username from the session
#           username = session.get('Username', '')
#           return {"Username": username}
