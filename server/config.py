# Standard library imports
import os
# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

from dotenv import load_dotenv
load_dotenv()

app=Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.json.compact=False
app.secret_key = os.environ.get("secret_key")

db=SQLAlchemy()

migrate = Migrate(app, db)
db.init_app(app)

bcrypt=Bcrypt(app)

api=Api(app)

CORS(app)