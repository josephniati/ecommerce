from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import certifi 
ca = certifi.where()

app = Flask(__name__)

# Configure CORS to allow requests from your React app's origin(s)
# cors = CORS(app, resources={r"/api/*": {"origins": ["https://5000-josephniati-ecommerce-vz2lk500dwi.ws-us107.gitpod.io", "https://3000-josephniati-ecommerce-vz2lk500dwi.ws-us107.gitpod.io"]}})

jwt = JWTManager(app)

app.config['MONGO_URI'] = 'mongodb+srv://emcmonkey12:Apple12@cluster0.44ycswl.mongodb.net/ecommerce?retryWrites=true&w=majority&authSource=admin'
mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secret-key'
@app.route("/")
def hello_world():
    try:
        mongo.db.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    return jsonify('Hello World')


@app.route("/adminRegister", methods=['POST', 'OPTIONS'])
def adminRegister():
    if request.method == 'OPTIONS':
        # Respond to CORS preflight request with appropriate headers
        response = jsonify(success=True)
        response.headers['Access-Control-Allow-Origin'] = '*'  # Update this to match your allowed origins
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        # Handle the POST request for user registration
        allUsers = mongo.db.admins
        print(request.json['email'])
        user = allUsers.find_one({'email': request.json['email']})
        companyName = allUsers.find_one({'companyName': request.json['companyName']})
        phone = allUsers.find_one({'phone': request.json['phone']})
        
        if user:
            print('Email already exists')
            return jsonify(message='Email already exists'), 401
        if companyName:
            print('Company Name already exists')

            return jsonify(message='CompanyName already exists'), 401
        if phone:
            print('Phone Number already exists')

            return jsonify(message='Phone Number already exists'), 401
            
        if request.json['password'] != request.json['cpassword']:
            print('Passwords do not Match')
           
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
        
        response = jsonify(token=str(access_token)), 201

    return response

# Your other routes remain the same...

if __name__ == '__main__':
    app.run(debug=True)
