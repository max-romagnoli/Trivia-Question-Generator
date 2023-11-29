from flask import request
from flask_restful import Resource
from typing import Tuple, Dict


class ScoresApiHandler(Resource):
    def get(self):
        return request.get_json()

    def post(self) -> Tuple[Dict[str,str], int]:
        data = request.get_json()
        username = data.get('username')
        score_value = data.get('value')

        # check if values have been passed
        if username is None or score_value is None:
            return {'error': 'username and score_value required'}, 400

        # create new db object
        try:
            from .models import Score
            from ..app import db
        except ImportError:
            from models import Score
            from app import db
        new_score = Score(username, score_value)

        # add obj to db or return exception if fail
        try:
            db.session.add(new_score)
            db.session.commit()
            return {'message': 'Score added successfully'}, 201
        except Exception as e:
            return {'message': f'Error adding score: {e}'}, 500
