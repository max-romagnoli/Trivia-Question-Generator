from flask_restful import Api, Resource, reqparse
from flask import session, jsonify
import requests


highscore_value = 40

# THIS IS A SAMPLE GET FUNCTION FOR GETTING HIGHSCORES
# I NEEDED SOMETHING TO TEST MY POST FUNCTION ON
class highScoresHandler(Resource):
     def get(self):
          global highscore_value
          return { 
            'response': "SUCCESS",
            'highscore': highscore_value
          }

"""
    the format of the highscores most likely wont be like this:
    {
            'response': response_value,
            'highscore': highscore_value
    }

    But it should be straight forward enough to change the post function

"""
class highScoreApiHandler(Resource):

    def post(self):
        global highscore_value
        url = 'http://127.0.0.1:5000/highscores'
      
        response = requests.get(url)
        print("Response code: ", response.status_code)
        
        if response.status_code == 200:
                json_data = response.json()
                
               # I will definitely have to make the highscore a parameter instead of just 
               # in the function
                new_highscore = 100
                highscore_value = new_highscore                

                # Make a POST request to update the data
                if(new_highscore >= json_data['highscore']):
                    return {
                            'response': "SUCCESS",
                        'highscore': highscore_value
                    } 
        else:
            return {"message": "Failed to fetch data from the endpoint."}, 500