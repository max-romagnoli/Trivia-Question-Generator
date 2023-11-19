from flask_restful import Api, Resource, reqparse
from flask import session, jsonify
import requests

# THIS IS A SAMPLE GET FUNCTION FOR GETTING HIGHSCORES
# I NEEDED SOMETHING TO TEST MY POST FUNCTION ON
class highScoresHandler(Resource):
     def get(self):
          return { 
            'response': "SUCCESS",
            'highscore': 40
          }
    
class highScoreApiHandler(Resource):

    def post(self):
       
        url = 'http://127.0.0.1:5000/highscores'
      
        response = requests.get(url)
        print("Response code: ", response.status_code)
        
        if response.status_code == 200:
                json_data = response.json()
                
               # I will definitely have to make the highscore a parameter instead of just 
               # in the function
                new_highscore = 100
                

                # Make a POST request to update the data
                if(new_highscore >= json_data['highscore']):
                     json_data['highscore'] = new_highscore 


                
                return {
                     'response': "SUCCESS",
                    'highscore': new_highscore
                } 
        else:
            return {"message": "Failed to fetch data from the endpoint."}, 500