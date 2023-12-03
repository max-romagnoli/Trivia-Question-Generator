try:
    from .conftest import client
except ImportError:
    from conftest import client

def test_hello(client):
    response = client.get("/flask/hello")
    assert response.status_code == 200
    assert response.json == {'response': "SUCCESS",'message': "Hello World!"}
