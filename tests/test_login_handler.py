from unittest.mock import MagicMock

try:
    from .conftest import client
    from .. import app
except ImportError:
    from conftest import client
    import app


def test_post_login(client):
    # Mock the database session
    mocked_db = MagicMock()
    app.db = mocked_db

    # Test Case 1: Valid request with a score value of 0
    req_body_valid = {
        'Username': 'ciao27'
    }

    response_valid = client.post("/login", json=req_body_valid)
    assert response_valid.status_code == 200  # Adjust based on your actual implementation
 

    # Test Case 2: Blank Username, should return 400 error code
    req_body_blank_username = {
        'Username': '',
    }

    response_blank_username = client.post("/login", json=req_body_blank_username)
    assert response_blank_username.status_code == 400
