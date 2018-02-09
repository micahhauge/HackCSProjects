from flask import *
from flask_sqlalchemy import *
import datetime
import DateTime
import sys

app = Flask(__name__)


@app.route('/hello')
def helloWorld():
    return '<html>Hello World</html>'


# configure postgres settings
POSTGRES = {
    'user': 'postgres',
    'pw': '',
    'db': 'postgres',
    'host': 'db',
    'port': '5432',
}
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
db = SQLAlchemy(app)

# set config to get rid of error
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#### MODELS ####
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    creator_id = db.Column(db.String(60), nullable=False)
    created_date = db.Column(DateTime, onupdate= datetime.datetime.now, nullable=False)
    upvotes = db.Column(db.Integer, nullable=False)


class UserProject_Association(db.model):
    user_id = db.Column(db.string(60), nullable = False)
    project_id = db.Column(db.Integer,nullable = False)
