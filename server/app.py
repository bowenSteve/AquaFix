from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
import random
from datetime import timedelta
from models import db, User, Profile, PlumberDetail


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost/aqua_db"
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh" + str(random.randint(1, 1000000000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV" + str(random.randint(1, 1000000000000))


bcrypt = Bcrypt(app)
jwt = JWTManager(app)

migrate = Migrate(app, db)
db.init_app(app)

#signup
@app.route('/signup', methods=['POST'])
def SignUp():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    is_plumber = data.get('is_plumber')
    if not all([username, email, password, is_plumber]):
        return jsonify({"message": "All fields are required"}), 400
    
    new_user = User(username=username, email=email,is_plumber=is_plumber)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Success": "User added successfully!"}), 201
#login
@app.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):  
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"message": "Invalid email or password"}), 401

# Logout
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200

@app.route('/plumbers', methods=['GET'])
def get_plumbers():
    plumbers = User.query.filter_by(is_plumber=True).all()
    
    plumber_list = []
    for plumber in plumbers:
        plumber_data = {
            'id': plumber.id,
            'username': plumber.username,
            'email': plumber.email,
            'profile': {
                'first_name': plumber.profile.first_name,
                'last_name': plumber.profile.last_name,
                'phone_number': plumber.profile.phone_number,
                'location': plumber.profile.location,
                'image': plumber.profile.image
            },
            'plumber_details': {
                'id_number': plumber.plumber_details.id_number,
                'years_of_experience': plumber.plumber_details.years_of_experience,
                'services_offered': plumber.plumber_details.services_offered,
                'rates':plumber.plumber_details.rates
            }
        }
        plumber_list.append(plumber_data)

    return jsonify(plumber_list)


@app.route('/plumber/<int:id>', methods=['GET'])
def get_plumber(id):
    plumber = User.query.filter_by(id=id).first()
    if not plumber:
        return jsonify({"error":"plumber not found"}),404
    else:
        plumber_data = {
            'id': plumber.id,
            'username': plumber.username,
            'email': plumber.email,
            'profile': {
                'first_name': plumber.profile.first_name,
                'last_name': plumber.profile.last_name,
                'phone_number': plumber.profile.phone_number,
                'location': plumber.profile.location,
                'image': plumber.profile.image
            },
            'plumber_details': {
                'id_number': plumber.plumber_details.id_number,
                'years_of_experience': plumber.plumber_details.years_of_experience,
                'services_offered': plumber.plumber_details.services_offered,
                'rates':plumber.plumber_details.rates
            }
        }
        return jsonify(plumber_data), 200


#currentuser
@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()  # Get the user ID from the JWT
    current_user = User.query.get(current_user_id)  # Fetch the user from the DB

    if current_user:
        return jsonify({
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "is_plumber":current_user.is_plumber
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404


























if __name__ == '__main__':
    app.run(debug=True)