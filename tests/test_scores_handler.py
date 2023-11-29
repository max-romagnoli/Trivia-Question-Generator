from unittest.mock import MagicMock

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
    mocked_db = MagicMock()
    app.db = mocked_db
    req_body = [
    {"username": "Alice", "value": 120},
    {"username": "Bob", "value": 90},
    {"username": "Charlie", "value": 150}
]
    response = client.get("/scores", json=req_body)
    
    assert response.status_code == 200
    assert response.json == req_body
    