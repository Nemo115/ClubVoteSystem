'''
THIS IS THE SCRIPT WHICH CONFIGURES THE SQL SERVER CONNECTION AND FLASK APPLICATION.
IT IS USED IN models.py AND main.py
'''
from flask import Flask, render_template, request, redirect, flash, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:5fwja35@localhost/schema_1' #'mysql://username:password@localhost/db_name' 2nd: mysql+pymysql://root:5fwja35@localhost/schema_1
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.app_context().push()