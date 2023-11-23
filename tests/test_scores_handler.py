from .conftest import client


def test_post_scores(client):
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
