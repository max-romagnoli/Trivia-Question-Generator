from flask_restful import Api, Resource, reqparse
from flask import session, jsonify
import requests

class HelloApiHandler(Resource):
    def get(self):
        return {
            'response': "SUCCESS",
            'message': 20, 
        }
    

        
        


