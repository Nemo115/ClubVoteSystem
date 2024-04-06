'''
THIS IS THE MAIN SCRIPT WHICH HANDLES ALL API LOGIC
'''
from flask import request, jsonify
from flask_cors import CORS
from config import app, db
import models
import datetime
from email_service.email_server import send_email

#CREATE ELECTION <-- (get clubs database)
@app.route('/create_election', methods=["POST"])
def create_election():
    name = request.json.get('name')
    description = request.json.get('description')
    start_time = request.json.get('startTime')
    end_time = request.json.get('endTime')
    show_results = request.json.get('showResults')

    #club_id = request.json.get('clubID')#OPTIONAL IF TIME ALLOWS
    
    if not (name or start_time or end_time):
        return (
            jsonify({"message": "Missing name, election code, start time or end time"}),
            400,
        )

    new_election = models.Election(name = name, description = description, start_time = start_time, end_time = end_time, show_results = show_results)

    try:
        db.session.add(new_election)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Election created!"}), 201

#GET ELECTION
@app.route('/get_election/<int:election_id>', methods = ["GET"])
def get_election(election_id):
    election = models.Election.query.get(election_id)
    nominees = models.Nominee.query.all()

    nominees = models.Nominee.query.filter(models.Nominee.election_id == election_id).all()
    return_nominees = []
    for nominee in nominees:
        position = models.Position.query.get(nominee.position_id)
        nominee = nominee.to_json()
        nominee["position"] = position.name
        return_nominees.append(nominee)
    
    return jsonify({"election": election.to_json(), "nominees": return_nominees})

#GET ALL ELECTIONS
@app.route('/get_elections', methods = ['GET'])
def get_elections():
    election_query = models.Election.query.all()
    json_election = list(map(lambda x: x.to_json(), election_query))
    return jsonify({"elections":json_election})

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
    name = request.json.get('name')
    email = request.json.get('email')
    verified_status = False
    election_id = request.json.get('electionID')

    print(request.json)
    if not email:
        return jsonify({"message": "Missing email"}), 400
    #Validate for Melbourne Uni Email
    at_index = email.find('@')
    '''if email[at_index:] != '@student.unimelb.edu.au':
        return (
            jsonify({"message": "Invalid Email. Must be melbourne uni email"}),
            400,
        )'''

    new_voter = models.Voters(name = name, email = email, verified_status = verified_status, election_id = election_id)

    try:
        db.session.add(new_voter)
        db.session.commit()
        #SEND VERIFICATION EMAIL HERE AND SEND LINK THAT CALLS update_voter
        send_email(new_voter.email, f'http://localhost:3000/verify/?code={new_voter.voter_id}')
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

    return jsonify({"voter_name": voter.name}), 200

#GET ALL VOTERS
@app.route('/voters', methods = ["GET"])
def get_voters():
    '''me = models.Voters(verified_status = False,email = 'JohnDoe@gmail.com')
    db.session.add(me)
    db.session.commit()'''

    voter_query = models.Voters.query.all()
    json_voters = list(map(lambda x: x.to_json(), voter_query))
    return jsonify({"voters":json_voters})
'''
#CREATE VOTE (Possibly merge with create voter)
@app.route('/create_vote/<int:voter_id>', methods = ["POST"])
def create_vote():
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
'''
@app.route('/get_votes', methods = ["GET"])# LOOK AT ALL THE VOTES
def get_votes():
    vote_query = models.Vote.query.all()
    json_votes = list(map(lambda x: x.to_json(), vote_query))
    return jsonify({"voters":json_votes})

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
    nominee = models.Nominee.query.all()
    json_nominee = list(map(lambda x: x.to_json(), nominee))
    return jsonify({"nominees": json_nominee})

#Get Specific nominee
@app.route('/get_nominee_s', methods = ["GET"])
def get_nominee_s():
    nominee = models.Nominee.query.all()
    json_nominee = list(map(lambda x: x.to_json(), nominee))
    return jsonify({"nominees": json_nominee})

#UPDATE NOMINEE
#@app.route('/update_nominee')

#DELETE NOMINEE
@app.route('/delete_nominee/<int:nominee_id>', methods = ["DELETE"])
def delete_nominee(nominee_id):
    nominee = models.Nominees.query.get(nominee_id)

    if not nominee:
        jsonify({"message": "Nominee not found"}), 404
    
    db.session.delete(nominee)
    db.session.commit()

    return jsonify({"message": "Nominee Deleted!"}), 200


#SPARE CODE FOR CLUB TABLE IN FUTURE
'''
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

#GET ALL CLUBS
@app.route('/get_all_clubs')
def get_all_clubs():
    clubs = models.Clubs.query.all()
    json_contacts = list(map(lambda x: x.to_json(), clubs))
    return jsonify({"clubs": clubs})
'''

#PAGE SUBMITS
@app.route('/api/elections/create', methods=["POST"])
def submit_election():
    name = request.json.get('name')
    description = request.json.get('description')
    startTime = request.json.get('startTime')
    finishTime = request.json.get('finishTime')
    positions = request.json.get('positions')
    showResults = request.json.get('showResults')
    print(showResults)

    if (not (name and startTime and finishTime and positions and description)):
        return jsonify({"error": "Missing start time, finish time, positions, description or name"}), 401
    
    startHour = int(startTime[:2])
    finishHour = int(finishTime[:2])
    startMin = int(startTime[3:])
    finishMin = int(startTime[3:])

    today = datetime.datetime.now()

    startTime = datetime.datetime(today.year, today.month, today.day, startHour, startMin)
    finishTime = datetime.datetime(today.year, today.month, today.day, finishHour, finishMin)

    election_id = None

    try:
        new_election = models.Election(name = name, description = description, start_time = startTime, end_time = finishTime, show_results = showResults)
        db.session.add(new_election)
        db.session.commit()
        election_id = new_election.election_id
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    print("HERERERERE")

    try:
        for pos in positions:
            new_position = models.Position(name = pos['name'], election_id=election_id)
            db.session.add(new_position)
            db.session.commit()
            for name in pos['candidates']:
                new_nominee = models.Nominee(name=name, position_id=new_position.position_id, election_id = election_id)
                print(new_nominee)
                db.session.add(new_nominee)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 500


    print(new_election.election_id)

    id = int(new_election.election_id)

    print(id)

    return jsonify({"election_id": id}), 201

## <-------THIS FUNCTION WAS PREVIOUSLY CALLED submit_vote2()-------->

@app.route('/api/votes/submit', methods=["POST"])
def submit_vote():
    nominees = request.json.get('nominees')
    name = request.json.get('name')
    email = request.json.get('email')
    nomineesOrganised = []
    currentPosition = []

    try:
        new_voter = models.Voters(name=name, email=email, verified_status = False)
        db.session.add(new_voter)
        db.session.commit()
        #SEND VERIFICATION EMAIL HERE AND SEND LINK THAT CALLS update_voter
        send_email(new_voter.email, f'http://localhost:3000/verify/?code={new_voter.voter_id}')
    except Exception as e:
        print('Here3')
        return jsonify({"message": str(e)}), 500
    if not nominees:
        return jsonify({}), 400
    for n in nominees:
        if currentPosition == [] or currentPosition[-1]['positionID'] == n['positionID']:
            currentPosition.append(n)
        else:
            nomineesOrganised.append(currentPosition)
            currentPosition = [n]
    nomineesOrganised.append(currentPosition)
    try:
        for n in nomineesOrganised:
            voteCount = len(n)
            for i in range(voteCount):
                print(i)
                print(n[i])
                new_vote = models.Vote(position_id=n[i]['positionID'], nominee_id=n[i]['nomineeID'], rank=i + 1, score=n[i]['score'], voter_id=new_voter.voter_id)
                db.session.add(new_vote)        
        db.session.commit()


    except Exception as e:
        return jsonify({"message": str(e)}), 500

    #submit_vote_data(n['positionID'], new_voter.voter_id, n)
    
    return jsonify({}), 201


@app.route('/api/election/isFinished', methods=["GET"])
def is_finished():
    election_id = request.args.get('electionId')

    election = models.Election.query.get(election_id)
    end_time = election.end_time
    now = datetime.datetime.now()

    return jsonify({"finished": end_time < now}), 200


def get_key(dic, val):
    for key, value in dic.items():
        if value == val:
            return key


def print2(arr):
    for a in arr:
        print(a)

def get_position_result(position_id):

    votes = models.Vote.query.filter_by(position_id=str(position_id)).all()
    big_votes = []
    current_vote = []
    vote_tally = {}
    for i in range(len(votes)):
        vote_tally[str(votes[i].nominee_id)] = 0
        if current_vote == [] or votes[i].voter_id == current_vote[-1]['voter_id']:
            current_vote.append({'voter_id': votes[i].voter_id, 'nominee_id': votes[i].nominee_id, 'rank': votes[i].rank})
        else:
            big_votes.append(current_vote)
            current_vote = [{'voter_id': votes[i].voter_id, 'nominee_id': votes[i].nominee_id, 'rank': votes[i].rank}]
    big_votes.append(current_vote)
    vote_count = len(big_votes)
    #print('VOTE COUNT')
    #print(vote_count)
    #print2(big_votes)
    #print(vote_tally)
    for i in range(len(big_votes)):
        key = str(big_votes[i][0]['nominee_id'])
        #print(key)
        vote_tally[key] += 1
    #print(vote_tally)

    while max(vote_tally.values()) <= vote_count / 2:
        to_remove = get_key(vote_tally, min(vote_tally.values()))
        #print('VOTE TALLY')
        #print(vote_tally)
        #print('BIG VOTES')
        #print2(big_votes)
        #print('REMOVING ', to_remove)
        del vote_tally[to_remove]

        for vote in big_votes:
            for mini_vote in vote:
                if (mini_vote['nominee_id'] == int(to_remove)):
                    mini_vote['nominee_id'] = -1
        #print('BIG VOTES AFTER')
        #print2(big_votes)

        # reset tally
        key_list = vote_tally.keys()
        for key in key_list:
            vote_tally[key] = 0
        # recount votes

        for vote in big_votes:
            for mini_vote in vote:
                if (mini_vote['nominee_id'] != -1):
                    vote_tally[str(mini_vote['nominee_id'])] = vote_tally[str(mini_vote['nominee_id'])] + 1
                    break
        #print('VOTES AFTER')
        #print(vote_tally)
    #print(vote_tally)

    return {'nominee_id': get_key(vote_tally, max(vote_tally.values())), 'votes': max(vote_tally.values()), 'total_votes': vote_count}


@app.route('/api/election/results', methods=["GET"])
def get_final_results():
    results = []
    total_votes = 0
    election_id = request.args.get('electionId')
    election = models.Election.query.get(election_id)
    positions = models.Position.query.filter_by(election_id=str(election_id)).all()
    print(positions)
    for p in positions:
        winner = get_position_result(p.position_id)
        total_votes = winner['total_votes']
        winner_nominee = models.Nominee.query.get(int(winner['nominee_id']))
        results.append({'position': p.name, 'name': winner_nominee.name, 'votes': winner['votes']})

    date = election.start_time.strftime("%d %b %Y")

    print(results)



    return jsonify({"date": date, "voteCount": total_votes, "positions": results, "voteId": election_id}), 200


#@app.route('/create_vote', method = ["GET", "POST"])
#def sub

#default page for looking at sql database values
@app.route('/')
def return_database_values():
    return get_voters()

if __name__ == "__main__":
    db.create_all()
    app.run(debug = True)