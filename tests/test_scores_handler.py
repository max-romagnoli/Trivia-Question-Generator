from unittest.mock import MagicMock

try:
    from .conftest import client
    from .. import app
except:
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
    # TODO: @Oisìn
    pass
