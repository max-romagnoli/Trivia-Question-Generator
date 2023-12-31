import pytest
try:
    from ..app import app
except ImportError:
    from app import app


@pytest.fixture()
def client():
    """ A mock client """
    with app.test_client() as client:
        yield client
