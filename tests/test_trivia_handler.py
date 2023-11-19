from .conftest import client


def test_get_trivia_question(client):
    response = client.get("/triviaquestion")
    assert response.status_code == 200
    resp_body = response.json
    assert "triviaQuestion" in resp_body
    question_info = resp_body["triviaQuestion"][0]
    # assert all the desired values are not null
    assert "question" in question_info and question_info["question"]
    assert "answer" in question_info and question_info["answer"]
    assert "value" in question_info and question_info["value"]
