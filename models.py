try:
    from app import db
except:
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