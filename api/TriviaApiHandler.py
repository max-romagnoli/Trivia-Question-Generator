from flask_restful import Resource
from . import util

class TriviaApiHandler(Resource):
    def get(self):
        question_data = util.get_random_trivia_q()
        if question_data is not None:
            return question_data, 200
        return {"error": "Internal Server Error :|"}, 500

