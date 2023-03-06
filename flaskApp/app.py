from flask import Flask,jsonify,request,session
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS,cross_origin


app = Flask(__name__)
jwt_manager=JWTManager(app)
CORS(app)


app.config["MONGO_URI"] = "mongodb+srv://emcmonkey12:Jaenoemc@23@cluster0.ubnum.mongodb.net/ECommerceFlask?retryWrites=true&w=majority"
mongo = PyMongo(app)

app.secret_key = 'super secret key'
app.config["JWT_SECRET_KEY"] = "this-is-secret-key"

@app.route("/")
def hello_world():
    return "<p>Hello, World!!!!!</p>"

@app.route("/adminRegister", methods=["POST"])
def adminRegister():
        allusers = mongo.db.admins

        user = allusers.find_one({'email':request.json['email']})
        companyName = allusers.find_one({'companyName':request.json['companyName']})
        phone = allusers.find_one({'phone':request.json['phone']})

        if user:
            return jsonify(message='Email already exists'),401
        if companyName:
            return jsonify(message='companyName already exists'),401
        if phone: 
            return jsonify(message='Phone already exists'),401

        if request.json['password'] != request.json['cpassword']:
            
             return jsonify(message='Password is not matching!!'),401

        hashpw = bcrypt.hashpw(

                request.json['password'].encode("utf-8"),bcrypt.gensalt()
             )

        hashcpw = bcrypt.hashpw(

                request.json['cpassword'].encode("utf-8"),bcrypt.gensalt()
             )

        access_token = create_access_token(identity=request.json['email'])

        allusers.insert({
                'email':request.json['email'],
                 'companyName':request.json['companyName'],

                'phone':request.json['phone'],

                'password':hashpw,
                'cpassword':hashcpw,
                'tokens':[
                    {
                        'token':str(access_token)
                    }
                ]                

             })

        return  jsonify(token= str(access_token)),201


@app.route("/adminLogin",methods=['POST'])
def adminLogin():
    allusers = mongo.db.admins
    user = allusers.find_one({'email': request.json['email']})

    if user:
         if  bcrypt.hashpw(request.json['password'].encode('utf-8'), user['password']) ==user['password']:

             access_token = create_access_token(identity=request.json['email'])
             user['tokens'].append({'token':str(access_token)})
             allusers.save(user)
    return jsonify(token= str(access_token)),201
    return jsonify(message='Invalid userid/password'),401

    allUsers = mongo.db.admins
    user = allUsers.find_one({'email': request.json['email']})

    if user:
        if bcrypt.hashpw(request.json['password'].encode('utf-8'), user['password']) == user['password']:
            # session['email'] = request.json['email']
            access_token = create_access_token(identity=request.json['email'])
            user['tokens'].append({'token': str(access_token)})
            allUsers.save(user)
            return jsonify(token=str(access_token)), 201
    return jsonify(message='Invalid Username/Password'), 401


@app.route("/logoutAdmin",methods=['POST'])
def logoutAdmin():
    allusers = mongo.db.admins
    user = allusers.find_one({'tokens.token': request.json['auth']})

    if user : 
        user['tokens'] = []
        allusers.save(user)
        return jsonify(message='Logout Successful'),201
    return jsonify(message='Logout Failed'),401






if __name__=='__main__':
    app.run(debug=True)