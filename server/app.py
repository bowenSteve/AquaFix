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
    if not all([username, email, password, is_plumber is not None]):
        return jsonify({"message": "All fields are required"}), 400

    new_user = User(username=username, email=email, is_plumber=is_plumber)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Success": "User added successfully!"}), 201

@app.route('/google_signup', methods=['POST'])
def google_signup():
    data = request.get_json()
    email = data.get('email')
    
   
    if not email:
        return jsonify({"error": "Email is required"}), 400

    
    existing_user = User.query.filter_by(email=email).first()
    
    if existing_user:
        return jsonify({"message": "User already exists. Please log in."}), 409

   
    new_user = User(username=email.split('@')[0], email=email, is_plumber=False)  
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully!",
        "access_token": "your_jwt_token" 
    }), 201

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

@app.route('/google_login', methods=['POST'])
def google_login():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"msg": "Email is required"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error":"email is not registered"}), 404
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

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
   
    plumbers = User.query.filter_by(is_plumber=True, completed_profile=True).all()
    
    plumber_list = []
    for plumber in plumbers:
      
        if plumber.profile:
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
    plumber = User.query.filter_by(id=id, is_plumber=True).first()
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
                'rates':plumber.plumber_details.rates,
                'about_me':plumber.plumber_details.about_me
            }
        }
        return jsonify(plumber_data), 200


#currentuser
@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()  
    current_user = User.query.get(current_user_id)

    if current_user:
        user_data = {
            'id': current_user.id,
            'username': current_user.username,
            'email': current_user.email,
            'is_plumber': current_user.is_plumber,
            'completed_profile': current_user.completed_profile
        }

        if current_user.completed_profile:
            if current_user.profile:
                user_data['profile'] = {
                    'first_name': current_user.profile.first_name,
                    'last_name': current_user.profile.last_name,
                    'phone_number': current_user.profile.phone_number,
                    'location': current_user.profile.location,
                    'image': current_user.profile.image
                }

        
        if current_user.is_plumber:
           
            if current_user.profile:
                user_data['profile'] = {
                    'first_name': current_user.profile.first_name,
                    'last_name': current_user.profile.last_name,
                    'phone_number': current_user.profile.phone_number,
                    'location': current_user.profile.location,
                    'image': current_user.profile.image
                }

           
            if current_user.plumber_details:
                user_data['plumber_details'] = {
                    'id_number': current_user.plumber_details.id_number,
                    'years_of_experience': current_user.plumber_details.years_of_experience,
                    'services_offered': current_user.plumber_details.services_offered,
                    'rates': current_user.plumber_details.rates,
                    'about_me': current_user.plumber_details.about_me
                }

        return jsonify(user_data), 200

    return jsonify({"error": "User not found"}), 404


@app.route('/update_profile', methods=['PATCH'])
def update_profile():
    data = request.get_json()

    user_id = data.get('user_id')
    profile_data = data.get('profile')
    plumber_details_data = data.get('plumber_details')

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    profile_completed = True

  
    if profile_data:
        profile = Profile.query.filter_by(user_id=user_id).first()
        if profile:
            profile.first_name = profile_data.get('first_name', profile.first_name)
            profile.last_name = profile_data.get('last_name', profile.last_name)
            profile.phone_number = profile_data.get('phone_number', profile.phone_number)
            profile.location = profile_data.get('location', profile.location)
            profile.image = profile_data.get('image', profile.image)
        else:
           
            new_profile = Profile(
                user_id=user_id,
                first_name=profile_data.get('first_name', ''),
                last_name=profile_data.get('last_name', ''),
                phone_number=profile_data.get('phone_number', ''),
                location=profile_data.get('location', ''),
                image=profile_data.get('image', '')
            )
            db.session.add(new_profile)

        
        required_profile_fields = ['first_name', 'last_name', 'phone_number', 'location']
        for field in required_profile_fields:
            if not profile_data.get(field):
                profile_completed = False

    
    if user.is_plumber and plumber_details_data:
        plumber_details = PlumberDetail.query.filter_by(user_id=user_id).first()
        if plumber_details:
            plumber_details.id_number = plumber_details_data.get('id_number', plumber_details.id_number)
            plumber_details.years_of_experience = plumber_details_data.get('years_of_experience', plumber_details.years_of_experience)
            plumber_details.services_offered = plumber_details_data.get('services_offered', plumber_details.services_offered)
            plumber_details.rates = plumber_details_data.get('rates', plumber_details.rates)
            plumber_details.about_me = plumber_details_data.get('about_me', plumber_details.about_me)
        else:
           
            new_plumber_details = PlumberDetail(
                user_id=user_id,
                id_number=plumber_details_data.get('id_number', ''),
                years_of_experience=plumber_details_data.get('years_of_experience', 0),
                services_offered=plumber_details_data.get('services_offered', ''),
                rates=plumber_details_data.get('rates', 0),
                about_me=plumber_details_data.get('about_me','')
            )
            db.session.add(new_plumber_details)

       
        required_plumber_fields = ['id_number', 'years_of_experience', 'services_offered', 'rates']
        for field in required_plumber_fields:
            if not plumber_details_data.get(field):
                profile_completed = False

    if profile_completed:
        user.completed_profile = True

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200




# chat section
#create room
@app.route('/chatroom', methods=['POST'])
@jwt_required()
def get_or_create_chatroom():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    plumber_id = data.get('plumber_id')

    if not plumber_id:
        return jsonify({"error": "Plumber ID is required"}), 400

    # Check if a chatroom already exists between the current user and the plumber
    chatroom = ChatRoom.query.filter_by(user_id=current_user_id, plumber_id=plumber_id).first()
    
    if not chatroom:
        # Create a new chatroom
        chatroom = ChatRoom(user_id=current_user_id, plumber_id=plumber_id)
        db.session.add(chatroom)
        db.session.commit()

    return jsonify({"chatroom_id": chatroom.id}), 201

#send message
@app.route('/chatroom/<int:chatroom_id>/message', methods=['POST'])
@jwt_required()
def send_message(chatroom_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    content = data.get('content')
    receiver_id = data.get('receiver_id')

    if not content or not receiver_id:
        return jsonify({"error": "Content and receiver ID are required"}), 400

    # Ensure the chatroom exists and the current user is part of the chatroom
    chatroom = ChatRoom.query.get_or_404(chatroom_id)
    if chatroom.user_id != current_user_id and chatroom.plumber_id != current_user_id:
        return jsonify({"error": "Unauthorized to send message in this chatroom"}), 403

    # Create and store the message
    message = Message(chatroom_id=chatroom.id, sender_id=current_user_id, receiver_id=receiver_id, content=content)
    db.session.add(message)
    db.session.commit()

    return jsonify({"success": "Message sent"}), 201

#get message
@app.route('/chatroom/<int:chatroom_id>/messages', methods=['GET'])
@jwt_required()
def get_chat_messages(chatroom_id):
    current_user_id = get_jwt_identity()

    # Ensure the chatroom exists and the current user is part of the chatroom
    chatroom = ChatRoom.query.get_or_404(chatroom_id)
    if chatroom.user_id != current_user_id and chatroom.plumber_id != current_user_id:
        return jsonify({"error": "Unauthorized to view messages in this chatroom"}), 403

    # Retrieve all messages in the chatroom
    messages = Message.query.filter_by(chatroom_id=chatroom.id).order_by(Message.timestamp).all()
    
    message_list = []
    for message in messages:
        message_list.append({
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'content': message.content,
            'timestamp': message.timestamp
        })

    return jsonify(message_list), 200




if __name__ == '__main__':
    app.run(debug=True)

