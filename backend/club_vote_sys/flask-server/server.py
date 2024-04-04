from flask import Flask, render_template, request, redirect, flash, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name' #'mysql://username:password@localhost/db_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db =  SQLAlchemy(app)

#[---SQL TABLES---]
class sample_table(db.Model):{
    
    #example constructor to be used
    '''def __init__(self, username, email):
        self.username = username
        self.email = email'''
}


db.create_all()

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
    app.run(debug = True)