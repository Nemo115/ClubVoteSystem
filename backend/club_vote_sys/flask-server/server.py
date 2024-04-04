from flask import Flask, render_template, request, redirect, flash, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db =  SQLAlchemy(app)

#[---SQL TABLES---]
class sample_table(db.Model):{

}

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