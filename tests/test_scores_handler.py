from unittest.mock import MagicMock
from unittest.mock import patch

try:
    from .conftest import client
    from .. import app
except ImportError:
    from conftest import client
    import app


def test_post_scores(client):
    mocked_db = MagicMock()
    app.db = mocked_db
    req_body = {
        'username': 'ciao27',
        'value': 1000
    }
    response = client.post("/scores", json=req_body)
    print(response)
    assert response.status_code == 201


def test_get_scores(client):  
  
    with patch('flask.Request.get_json') as mock_get_json:
        mock_get_json.return_value = {
            "scores": [
                {"username": "Alice", "value": 120}, 
                {"username": "Bob", "value": 90},
                {"username": "Charlie", "value": 150},
                {"username": "A", "value": 120}, 
                {"username": "B", "value": 905},
                {"username": "C", "value": 1530},
                {"username": "D", "value": 1220}, 
                {"username": "E", "value": 920},
                {"username": "F", "value": 15},
                {"username": "ten", "value": 10},
                {"username": "dont_add", "value": 404},
                {"username": "dont_add", "value": 404},
                {"username": "dont_add", "value": 404},
            ]
        }

        response = client.get("/scores")

        assert response.status_code == 200
        expected_json = [
                {"username": "Alice", "value": 120}, 
                {"username": "Bob", "value": 90},
                {"username": "Charlie", "value": 150},
                {"username": "A", "value": 120}, 
                {"username": "B", "value": 905},
                {"username": "C", "value": 1530},
                {"username": "D", "value": 1220}, 
                {"username": "E", "value": 920},
                {"username": "F", "value": 15},
                {"username": "ten", "value": 10},
        ]
        
        assert response.json == expected_json
    
    