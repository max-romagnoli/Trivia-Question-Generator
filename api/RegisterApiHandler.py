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
            if username == '':
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

    def get(self):
        # TODO: this is a placeholder for testing. it queries and prints all entries.
        try:
            from ..models import User
        except ImportError:
            from models import User
        result = [{"username": entry.username, "password": entry.password} for entry in User.query.all()]
        print(result)
        return {'ALL USERS': result}

