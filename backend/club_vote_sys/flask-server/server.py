from flask import Flask, render_template, request, redirect, flash, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:5fwja35@localhost/schema_1' #'mysql://username:password@localhost/db_name' 2nd: mysql+pymysql://root:5fwja35@localhost/schema_1
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
app.app_context().push()

#[---SQL TABLES---]
class Election(db.Model):
    __tablename__ = 'Election'
    ElectionID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(45))
    Description = db.Column(db.String(45))
    ElectionCode = db.Column(db.String(45))
    StartTime = db.Column(db.String(45))
    EndTime = db.Column(db.String(45))
'''
class ElectionCreationEvent(db.Model):
    __tablename__ = 'ElectionCreationEvent'
    ElectionCreationID = db.Column(db.Integer, primary_key=True)
    CreationTime = db.Column(db.String(45))
    ElectionID = db.Column(db.String(45), db.ForeignKey('Election.ElectionID'))

class ElectionCreator(db.Model):
    __tablename__ = 'ElectionCreator'
    Email = db.Column(db.Integer, primary_key=True)

class EmailVerificationEvent(db.Model):
    __tablename__ = 'EmailVerificationEvent'
    VerificationID = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(45), db.ForeignKey('Voters.Email'))
    VerificationCode = db.Column(db.String(45))
    ExpirationTime = db.Column(db.String(45))
    Status = db.Column(db.String(45))

class Nominees(db.Model):
    __tablename__ = 'Nominees'
    Names = db.Column(db.String(45))
    position = db.Column(db.String(45))
    Email = db.Column(db.String(45))
    NomineeID = db.Column(db.String(45), primary_key=True)

class ParticipationEvent(db.Model):
    __tablename__ = 'ParticipationEvent'
    ParticipationID = db.Column(db.Integer, primary_key=True)
    Status = db.Column(db.String(45))
    ElectionID = db.Column(db.String(45), db.ForeignKey('Election.ElectionID'), primary_key=True)
    NomineeID = db.Column(db.String(45), db.ForeignKey('Nominees.NomineeID'), primary_key=True)

class Voters(db.Model):
    __tablename__ = 'Voters'
    Verified_status = db.Column(db.Boolean)
    Email = db.Column(db.String(45))
    VoterID = db.Column(db.String(45), primary_key=True)

class Votes(db.Model):
    __tablename__ = 'Votes'
    VoteID = db.Column(db.Integer, primary_key=True)
    VoterID = db.Column(db.Integer, db.ForeignKey('Voters.VoterID'))
    NomineeID = db.Column(db.String(45), db.ForeignKey('Nominees.NomineeID'))
    Timestamp = db.Column(db.String(45))

class VotingEvent(db.Model):
    __tablename__ = 'VotingEvent'
    VotingEventID = db.Column(db.Integer, primary_key=True)
    Status = db.Column(db.String(45))
    EligibilityStatus = db.Column(db.String(45))
    ElectionID = db.Column(db.Integer, db.ForeignKey('Election.ElectionID'), primary_key=True)
    VoterID = db.Column(db.String(45), db.ForeignKey('Voters.VoterID'), primary_key=True)
'''

print(str(db)+'|||')

@app.route('/')
def home():
    return {"Foo": ["Foo1", "Foo2", "Foo3"]}

#CREATE ELECTION
@app.route('/app/api/v1/election/create')
def create_election():
    return {}

#SUBMIT VOTE
@app.route('/app/api/v1/votes/submit')
def submit_vote():
    return {}

#VERIFY VOTER EMAIL
@app.route('/app/api/v1/votes/verify')
def verify_vote():
    return {}

if __name__ == "__main__":
    db.create_all()
    app.run(debug = True)