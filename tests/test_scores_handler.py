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


def test_get_highscores_returns_valid_status_code(client):
    mocked_db = MagicMock()
    app.db = mocked_db

    # sending get request and asserting desired values
    response = client.get("/scores")
    assert response.status_code == 200

    