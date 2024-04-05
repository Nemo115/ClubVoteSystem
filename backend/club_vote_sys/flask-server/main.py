'''
THIS IS THE MAIN SCRIPT WHICH HANDLES ALL API LOGIC
'''
from flask import request, jsonify
from flask_cors import CORS
from config import app, db
import models

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#CREATE ELECTION <-- (get clubs database)
@app.route('/create_election', methods=["POST"])
def create_election():
    name = request.json.get('name')
    description = request.json.get('description')
    election_code = request.json.get('electionCode')
    start_time = request.json.get('startTime')
    end_time = request.json.get('endTime')
    club_id = request.json.get('clubID')
    
    if not (name or election_code or start_time or end_time):
        return (
            jsonify({"message": "Missing name, election code, start time or end time"}),
            400,
        )

    new_election = models.Election(name = name, description = description, election_code = election_code, start_time = start_time, end_time = end_time, club_id = club_id)

    try:
        db.session.add(new_election)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Election created!"}), 201

#DELETE ELECTION
@app.route('/delete_election/<int:election_id>', methods = ["DELETE"])
def delete_election(election_id):
    election = models.Election.query.get(election_id)

    if not election:
        return jsonify({"message": "Election not found"}), 404
    
    db.session.delete(election)
    db.session.commit()

    return jsonify({"message": "Election deleted!"}), 200

#CREATE VOTER
@app.route('/create_voter', methods=["POST", "GET"])
def create_voter():
    verified_status = False
    email = request.json.get('email')
    
    if not email:
        return (
            jsonify({"message": "Missing email"}),
            400,
        )
    at_index = email.find('@')
    if email[at_index:] != '@student.unimelb.edu.au':
        return (
            jsonify({"message": "Invalid Email. Must be melbourne uni email"}),
            400,
        )

    new_voter = models.Voters(email = email)

    try:
        db.session.add(new_voter)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    print(new_voter)
    return jsonify({"message": "Voter registered!"}), 201

#UPDATE VOTER (verify email) (Send the user a link with voter id already inserted)
@app.route('/update_voter/<int:voter_id>', methods=["PATCH", "GET"])
def verify_voter(voter_id):
    voter = models.Voters.query.get(voter_id)
    voter.verified_status = True
    db.session.commit()

    return jsonify({"message": "Voter Verified"}), 200

#GET ALL VOTERS
@app.route('/voters', methods = ["GET"])
def get_voters():
    '''me = models.Voters(verified_status = False,email = 'JohnDoe@gmail.com')
    db.session.add(me)
    db.session.commit()'''

    voter_query = models.Voters.query.all()
    json_voters = list(map(lambda x: x.to_json(), voter_query))
    return jsonify({"voters":json_voters})

#CREATE VOTE (Possibly merge with create voter)
@app.route('/create_vote/<int:voter_id>', methods = ["POST"])
def create_vote():
    '''verified_status = False
    email = request.json.get('email')
    
    if not email:
        return (
            jsonify({"message": "Missing email"}),
            400,
        )
    at_index = email.find('@')
    if email[at_index:] != '@student.unimelb.edu.au':
        return (
            jsonify({"message": "Invalid Email. Must be melbourne uni email"}),
            400,
        )

    new_voter = models.Voters(email = email)

    try:
        db.session.add(new_voter)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Voter registered!"}), 201'''
    pass

#DELETE VOTE
@app.route('/delete_vote/<int:vote_id>', methods = ["DELETE"])
def delete_vote(vote_id):
    vote = models.Votes.query.get(vote_id)

    if not vote:
        return jsonify({"message": "Vote not found"}), 404
    
    db.session.delete(vote)
    db.session.commit()

    return jsonify({"message": "Vote deleted!"}), 200

#CREATE NOMINEE
@app.route('/create_nominee', methods = ["POST"])
def create_nominee():
    name = request.json.get("name")
    position = request.json.get("position")
    email = request.json.get("email")

    if not name or not position or not email:
        return (
            jsonify({"message": "You must include a name, position and email"}),
            400,
        )
    new_nominee = models.Nominees(name = name, position=position, email=email)
    try:
        db.session.add(new_nominee)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Nominee created!"}), 201

#GET NOMINEES
@app.route('/get_nominees', methods = ["GET"])
def get_nominees():
    nominees = models.Nominees.query.all()
    json_contacts = list(map(lambda x: x.to_json(), nominees))
    return jsonify({"nominees": nominees})

#DELETE NOMINEE
@app.route('/delete_nominee/<int:nominee_id>', methods = ["DELETE"])
def delete_nominee(nominee_id):
    nominee = models.Nominees.query.get(nominee_id)

    if not nominee:
        jsonify({"message": "Nominee not found"}), 404
    
    db.session.delete(nominee)
    db.session.commit()

    return jsonify({"message": "Nominee Deleted!"}), 200

#REGISTER CLUB (Only in admin pages)
@app.route('/register_club', methods = ["POST"])
def register_club():
    club_query = models.Clubs.query.all()
    if not club_query:
        blank_club = models.Clubs(club_name = "BLANK", photo_url = "")

#DELIST CLUB (Only in admin pages)
@app.route('/delist_club/<int:club_id>', methods = ["DELETE"])
def delist_club(club_id):
    club = models.Votes.query.get(club_id)

    if not club_id:
        return jsonify({"message": "Club not found"}), 404
    
    db.session.delete(club)
    db.session.commit()

    return jsonify({"message": "Club delisted!"}), 200

#GET CLUB NAME AND LOGO
@app.route('/get_club/<int:club_id>', methods = ["GET"])
def get_club(club_id):
    club_search = models.Clubs.query.get(club_id)
    return jsonify(club_search), 200

@app.route('/')
def home():
    return 'hello'

if __name__ == "__main__":
    db.create_all()
    app.run(debug = True)