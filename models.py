try:
    from app import db
except ImportError:
    from .app import db
from datetime import datetime


class Score(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, username, score):
        self.username = username
        self.score = score

    def __repr__(self):
        return '<id %r, username %r, score %r' % (self.id, self.username, self.score)


class User(db.Model):

    username = db.Column(db.String(50), primary_key=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<username %r' % (self.username)