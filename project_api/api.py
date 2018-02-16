from flask import *
from flask_sqlalchemy import *
from flask_cors import CORS
import datetime
import sys

app = Flask(__name__, static_folder = "./dist/static", template_folder = "./dist")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/hello')
def helloWorld():
    return '<html>Hello World</html>'

# route to index.html (handles frontend)
@app.route('/')
def index():
    return render_template("index.html")


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
    user_name = db.Column(db.String(50))
    display_name = db.Column(db.String(50))
    password = db.Column(db.String(50))


class Project(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))
    creator_id = db.Column(db.String(60), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)
    upvotes = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(256), nullable=False)

class UserProject_Association(db.Model):
    user_id = db.Column(db.String(60), nullable = False, primary_key=True)
    project_id = db.Column(db.Integer,nullable = False, primary_key=True)


# Create user route
# Author: Micah Hauge
@app.route('/api/user', methods=['POST'])
def createUser():
    # get datat from request
    data = request.get_json()

    # create a new user object with the data from the request
    new_user = User(user_name=data['user_name'], password=data['password'], display_name=['display_name'])

    # add teh new_user to the session
    db.session.add(new_user)

    # commit the changes to the database
    db.session.commit()

    # return a response
    return jsonify({'message': 'Success! User created.'})

#Create Project
#Author: Spencer Arnold
@app.route('/api/project', methods=['POST'])
def createProject():

    data = request.get_json()

    new_project = Project(name = data['name'], creator_id = data['creator_id'], upvotes = data['upvotes'], description = data['description'])

    db.session.add(new_project)

    db.session.commit()

    return jsonify({'message': 'Success! New project created.'})


#Get Projects
#Nathan
@app.route("/api/project",methods =['GET'])
def getProjects():
    projects = Project.query.all()
    project_list = []

    for project in projects:
        proj_data = {}
        proj_data['name'] = project.name
        proj_data['creator_id'] = project.creator_id
        proj_data['created_date'] = project.created_date
        proj_data['upvote'] = project.upvotes
        proj_data['description'] = project.description
        project_list.append(proj_data)

    return jsonify({"Project:" : project_list})

#Get User
#Nathan
@app.route("/api/user",methods=['GET'])
def getUser():
    users = User.query.all()
    result = []

    for user in users:
        user_data= {}
        user_data['user_name'] = user.user_name
        user_data['password'] = user.password
        user_data['display_name'] = user.display_name
        user_data['id'] = user.id
        result.append(user_data)

    return jsonify({'Users: ':result})


# route to create the database
@app.route('/api/create_db')
def create_db():
    db.create_all()
    return 'Success!'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    print("Running on port 5001")
    app.run(host='0.0.0.0', port=5001, debug=True)
