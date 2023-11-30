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


def test_get_most_recent_scores_when_less_than_ten(client):
    mocked_db = MagicMock()
    app.db = mocked_db

    # populate db with three scores (using POST)
    req_body_scores = [
        {"username": "Alice", "value": 120},
        {"username": "Bob", "value": 90},
        {"username": "Charlie", "value": 150}
    ]
    for s in req_body_scores:
        client.post("/scores", json=s)

    # expecting scores in reverse order of how we posted them
    exp_response_body = {
        "scores": [
            {"id": 3, "username": "Charlie", "value": 150},
            {"id": 2, "username": "Bob", "value": 90},
            {"id": 1, "username": "Alice", "value": 120}
        ]
    }

    # sending get request and asserting desired values
    response = client.get("/scores")
    assert response.json == exp_response_body
    assert response.status == 200

    