from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, CheckConstraint

db = SQLAlchemy()

class Election(db.Model):
    __tablename__ = 'Election'
    ElectionID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(45))
    Description = db.Column(db.String(45))
    ElectionCode = db.Column(db.String(45))
    StartTime = db.Column(db.String(45))
    EndTime = db.Column(db.String(45))

class ElectionCreationEvent(db.Model):
    __tablename__ = 'ElectionCreationEvent'
    ElectionCreationID = db.Column(db.Integer, primary_key=True)
    CreationTime = db.Column(db.String(45))
    ElectionID = db.Column(db.String(45), ForeignKey('Election.ElectionID'))

class ElectionCreator(db.Model):
    __tablename__ = 'ElectionCreator'
    Email = db.Column(db.Integer, primary_key=True)

class EmailVerificationEvent(db.Model):
    __tablename__ = 'EmailVerificationEvent'
    VerificationID = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(45), ForeignKey('Voters.Email'))
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
    ElectionID = db.Column(db.String(45), ForeignKey('Election.ElectionID'), primary_key=True)
    NomineeID = db.Column(db.String(45), ForeignKey('Nominees.NomineeID'), primary_key=True)

class Voters(db.Model):
    __tablename__ = 'Voters'
    Verified_status = db.Column(db.Boolean)
    Email = db.Column(db.String(45))
    VoterID = db.Column(db.String(45), primary_key=True)

class Votes(db.Model):
    __tablename__ = 'Votes'
    VoteID = db.Column(db.Integer, primary_key=True)
    VoterID = db.Column(db.Integer, ForeignKey('Voters.VoterID'))
    NomineeID = db.Column(db.String(45), ForeignKey('Nominees.NomineeID'))
    Timestamp = db.Column(db.String(45))

class VotingEvent(db.Model):
    __tablename__ = 'VotingEvent'
    VotingEventID = db.Column(db.Integer, primary_key=True)
    Status = db.Column(db.String(45))
    EligibilityStatus = db.Column(db.String(45))
    ElectionID = db.Column(db.Integer, ForeignKey('Election.ElectionID'), primary_key=True)
    VoterID = db.Column(db.String(45), ForeignKey('Voters.VoterID'), primary_key=True)