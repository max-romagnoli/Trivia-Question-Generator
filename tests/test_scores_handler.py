from .conftest import client
from unittest.mock import MagicMock
from .. import app


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
    # TODO: @Oisìn
    from ..models import Score
    print("\nALL SCORES: ", list(Score.query.all()))
