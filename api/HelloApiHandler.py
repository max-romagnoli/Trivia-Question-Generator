from flask_restful import Api, Resource, reqparse

class HelloApiHandler(Resource):
    def get(self):
        return {
            'response': "SUCCESS",
            'message': "Hello World!"
        }, 200
