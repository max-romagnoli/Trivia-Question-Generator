from typing import Dict, Union
import requests
from enum import Enum, auto

# can use this class for storing all our URL
#  contants like the trivia api and db urls
class UrlConst(Enum):
    TRIVIA_API_BASE           = "https://jservice.io/"
    TRIVIA_API_RANDOM_Q_ROUTE = "/api/random"
    DB_HOST                   = ""


def get_random_trivia_q() -> Dict[str, Union[str, int]]:
    try:
        response = requests.get(
            UrlConst.TRIVIA_API_BASE.value + 
            UrlConst.TRIVIA_API_RANDOM_Q_ROUTE.value
        )
        response.raise_for_status()
    except requests.RequestException:
        return None # if there is http error, return null

    # Parse response
    try:
        # take first question if theres multiple
        question_data = response.json()[0]
        return {
            "triviaQuestion": [
                {
                    "question": question_data["question"],
                    "answer": question_data["answer"],
                    "value": question_data["value"]
                },
            ]
        }
    except (KeyError, TypeError, ValueError):
        return None # if the entries we need don't exist, return null
