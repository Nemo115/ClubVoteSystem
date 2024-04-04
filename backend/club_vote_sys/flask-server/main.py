'''
THIS IS THE MAIN SCRIPT WHICH HANDLES ALL API LOGIC
'''
from flask import request, jsonify
from config import app, db
import models

@app.route('/')
def home():
    '''me = models.Voters(verified_status = False,email = 'JohnDoe@gmail.com')
    db.session.add(me)
    db.session.commit()'''

    voter_query = models.Voters.query.all()
    json_voters = list(map(lambda x: x.to_json(), voter_query))
    return jsonify({"voters":json_voters})

#CREATE ELECTION
@app.route('/create', methods=["POST", "GET"])
def create_election():
    return {}

#SUBMIT VOTE
@app.route('/join', methods=["POST", "GET"])
def submit_vote():
    return {}

#VERIFY VOTER EMAIL
@app.route('/verify', methods=["POST", "GET"])
def verify_vote():
    return {}

if __name__ == "__main__":
    db.create_all()
    app.run(debug = True)