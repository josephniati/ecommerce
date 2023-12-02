from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
import bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "https://5000-josephniati-ecommerce-vz2lk500dwi.ws-us106.gitpod.io"}})

jwt = JWTManager(app)
CORS(appresources={r"/api/*": {"origins": "https://5000-josephniati-ecommerce-vz2lk500dwi.ws-us106.gitpod.io"}})

app.config['MONGO_URI'] = 'mongodb+srv://emcmonkey12:Apple%4050@cluster0.44ycswl.mongodb.net/EWebsiteFlask?retryWrites=true&w=majority'
mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secret-key'

@app.route("/")
def hello_world():
    return 'Hello World'

@app.route("/adminRegister", methods=['POST'])  # 'method' should be 'methods'
def adminRegister():
    allUsers = mongo.db.admins
    
    user = allUsers.find_one({'email': request.json['email']})
    companyName = allUsers.find_one({'companyName': request.json['companyName']})
    phone = allUsers.find_one({'phone': request.json['phone']})
    
    if user:
        return jsonify(message='Email already exists'), 401
    if companyName:
        return jsonify(message='CompanyName already exists'), 401
    if phone:
        return jsonify(message='Phone Number already exists'), 401
        
    if request.json['password'] != request.json['cpassword']:
        return jsonify(message='Password not Matching!!'), 401
    
    hashpw = bcrypt.hashpw(
        request.json['password'].encode('utf-8'), bcrypt.gensalt()
    )
    
    hashcpw = bcrypt.hashpw(
        request.json['cpassword'].encode('utf-8'), bcrypt.gensalt()
    )
    
    access_token = create_access_token(identity=request.json['email'])
    
    allUsers.insert({
        'email': request.json['email'],
        'companyName': request.json['companyName'],
        'phone': request.json['phone'],
        'password': hashpw,  # Save the hashed password
        'cpassword': hashcpw,  # Save the hashed cpassword
        'tokens': [
            {
                'token': str(access_token)
            }
        ]
    })
    
    return jsonify(token=str(access_token)), 201

@app.route("/adminLogin", methods=['POST'])
def adminLogin():
    allUsers = mongo.db.admins
    user = allUsers.find_one({'email': request.json['email']})
    
    if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user['password']):
        access_token = create_access_token(identity=request.json['email'])
        user['tokens'].append({'token': str(access_token)})
        allUsers.save(user)
        return jsonify(token=str(access_token)), 201
    else:
        return jsonify(message='Invalid userid/password'), 401

@app.route("/logoutAdmin", methods=['POST'])
def logoutAdmin():
    allUsers = mongo.db.admins
    user = allUsers.find_one({'tokens.token': request.json['auth']})
    
    if user:
        user['tokens'] = []
        allUsers.save(user)
        return jsonify(message='Logout Successful'), 201
    else:
        return jsonify(message='Logout Failed'), 401

if __name__ == '__main__':
    app.run(debug=True)
