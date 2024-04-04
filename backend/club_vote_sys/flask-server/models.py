'''
THIS SCRIPT DEFINES ALL DATABASE MODELS SEPARATELY FOR USAGE IN main.py SCRIPT
'''
from config import db

#[---SQL TABLES---]
class Clubs(db.Model):
    __tablename__ = 'Clubs'
    club_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    club_name = db.Column(db.String(45))
    photo_url = db.Column(db.String(45))

class Election(db.Model):
    __tablename__ = 'Election'
    election_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    name = db.Column(db.String(45))
    description = db.Column(db.String(45))
    election_code = db.Column(db.String(45))
    start_time = db.Column(db.String(45))
    end_time = db.Column(db.String(45))
    club_id = db.Column(db.Integer, db.ForeignKey('Clubs.club_id'))

    def to_json(self):
        return {
            "electionID":self.election_id,
            "name": self.name,
            "description": self.description,
            "electionCode":self.election_code,
            "startTime":self.start_time,
            "endTime":self.end_time,
            "clubID": self.club_id
        }

class ElectionCreationEvent(db.Model):
    __tablename__ = 'ElectionCreationEvent'
    election_creation_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    creation_time = db.Column(db.String(45))
    election_id = db.Column(db.Integer, db.ForeignKey('Election.election_id'))

    def to_json(self):
        return {
            "electionCreationID": self.election_creation_id,
            "creationTime": self.creation_time,
            "electionID": self.election_id
        }

class ElectionCreator(db.Model):
    __tablename__ = 'ElectionCreator'
    email = db.Column(db.Integer, primary_key=True, autoincrement = True)
    
    def to_json(self):
        return {
            "email": self.email
        }

class Nominees(db.Model):
    __tablename__ = 'Nominees'
    nominee_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    name = db.Column(db.String(45))
    position = db.Column(db.String(45))
    email = db.Column(db.String(45))

    def to_json(self):
        return {
            "nomineeID": self.nominee_id,
            "name": self.name,
            "position": self.position,
            "email": self.email
        }

class ParticipationEvent(db.Model):
    __tablename__ = 'ParticipationEvent'
    participation_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    status = db.Column(db.String(45))
    election_id = db.Column(db.Integer, db.ForeignKey('Election.election_id'), primary_key=True)
    nominee_id = db.Column(db.Integer, db.ForeignKey('Nominees.nominee_id'))

    def to_json(self):
        return{
            "participationID":self.participation_id,
            "status":self.status,
            "electionID":self.election_id,
            "nomineeID":self.nominee_id
        }

class Voters(db.Model):
    __tablename__ = 'Voters'
    voter_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    verified_status = db.Column(db.Boolean)
    email = db.Column(db.String(45), unique = True)

    def to_json(self):
        return{
            "voterID": self.voter_id,
            "verifiedStatus": self.verified_status,
            "email": self.email
        }

class Votes(db.Model):
    __tablename__ = 'Votes'
    vote_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    voter_id = db.Column(db.Integer, db.ForeignKey('Voters.voter_id'))
    nominee_id = db.Column(db.Integer, db.ForeignKey('Nominees.nominee_id'))
    timestamp = db.Column(db.String(45))

    def to_json(self):
        return{
            "voteID": self.vote_id,
            "voterID": self.voter_id,
            "nomineeID": self.nominee_id,
            "timestamp": self.timestamp
        }

class VotingEvent(db.Model):
    __tablename__ = 'VotingEvent'
    voting_event_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    status = db.Column(db.String(45))
    eligibility_status = db.Column(db.String(45))
    election_id = db.Column(db.Integer, db.ForeignKey('Election.election_id'), primary_key=True)
    voter_id = db.Column(db.Integer, db.ForeignKey('Voters.voter_id'), primary_key=True)

    def to_json(self):
        return{
            "votingEventID":self.voting_event_id,
            "status":self.status,
            "eligibilityStatus": self.eligibility_status,
            "electionID": self.election_id,
            "voterID": self.voter_id
        }

class EmailVerificationEvent(db.Model):
    __tablename__ = 'EmailVerificationEvent'
    verification_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    voter_id = db.Column(db.Integer, db.ForeignKey('Voters.voter_id'))
    verification_code = db.Column(db.String(45))
    expiration_time = db.Column(db.String(45))
    status = db.Column(db.String(45))

    def to_json(self):
        return{
            "verificationID": self.verification_id,
            "voterID": self.voter_id,
            "verificationCode": self.verification_code,
            "expirationTime": self.expiration_time,
            "status": self.status
        }