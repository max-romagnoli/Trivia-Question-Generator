from unittest.mock import MagicMock

try:
    from .conftest import client
    from .. import app
except ImportError:
    from conftest import client
    import app


def test_post_register_with_valid_username(client):
    # Mock the database session
    mocked_db = MagicMock()
    app.db = mocked_db

    req_body_valid = {
        'username': 'ciao27',
        'password': '12345'
    }

    response_valid = client.post("/register", json=req_body_valid)
    print(response_valid)
    assert response_valid.status_code == 201  # Adjust based on your actual implementation
 

def test_post_register_with_blank_username(client):
    # Mock the database session
    mocked_db = MagicMock()
    app.db = mocked_db

    req_body_blank_username = {
        'username': '',
        'password': ''
    }

    response_blank_username = client.post("/register", json=req_body_blank_username)
    print(response_blank_username)
    assert response_blank_username.status_code == 400

