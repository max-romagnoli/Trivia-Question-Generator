from flask import request, session
from flask_restful import Resource
from werkzeug.security import check_password_hash, generate_password_hash


class RegisterApiHandler(Resource):
    def post(self):
        if request.is_json:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            password = generate_password_hash(password)

            # Check if the 'Name' field is blank
            if not username:
                return {"error": "Username cannot be blank"}, 400

            try:
                from ..models import User
                from ..app import db
            except ImportError:
                from models import User
                from app import db

            # Save the user to the database
            user = User(username, password)

            try:
                db.session.add(user)
                db.session.commit()
                return {"message": "Registered successfully"}, 201
            except Exception as e:
                return {"message": f"Error adding user: {e}"}, 500

        else:
            return {"error": "Invalid JSON in the request"}, 400

# class GetUserResource(Resource):
#     def get(self):
#           # Retrieve the username from the session
#           username = session.get('Username', '')
#           return {"Username": username}
