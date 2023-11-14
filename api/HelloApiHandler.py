from flask_restful import Api, Resource, reqparse


class HelloApiHandler(Resource):
    def get(self):
        return {
            'message': "Hello World!"
        }
