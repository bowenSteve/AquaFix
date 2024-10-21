from app import app
from models import db, User, Profile, PlumberDetail, ChatRoom, Message
from werkzeug.security import generate_password_hash
from datetime import datetime

# Create user data
users_data = [
    {'username': 'john_doe', 'email': 'john@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'alice_smith', 'email': 'alice@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'bob_jones', 'email': 'bob@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'carol_white', 'email': 'carol@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'dave_black', 'email': 'dave@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'eve_green', 'email': 'eve@example.com', 'password': 'password', 'is_plumber': True},
]

# Create profile data
profiles_data = [
    {'first_name': 'John', 'last_name': 'Doe', 'phone_number': '123-456-7890', 'location': 'New York', 'image': 'https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Alice', 'last_name': 'Smith', 'phone_number': '123-456-7891', 'location': 'Los Angeles', 'image': 'https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Bob', 'last_name': 'Jones', 'phone_number': '123-456-7892', 'location': 'Chicago', 'image': 'https://images.unsplash.com/photo-1533108344127-a586d2b02479?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Carol', 'last_name': 'White', 'phone_number': '123-456-7893', 'location': 'Houston', 'image': 'https://images.unsplash.com/photo-1529663557617-39f3243b531a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Dave', 'last_name': 'Black', 'phone_number': '123-456-7894', 'location': 'Phoenix', 'image': 'https://images.unsplash.com/photo-1551692703-f4941f2f0f6a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Eve', 'last_name': 'Green', 'phone_number': '123-456-7895', 'location': 'Philadelphia', 'image': 'https://images.unsplash.com/photo-1531299102504-fc718f23c100?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
]

# Create plumber details data
plumber_details_data = [
    {'id_number': 'PL1234567', 'years_of_experience': 5, 'services_offered': 'pipe installation and repair', 'rates': '1000', 'about_me': 'Experienced in pipe installation and repair.'},
    {'id_number': 'PL2345678', 'years_of_experience': 6, 'services_offered': 'leak detection and repair', 'rates': '1200', 'about_me': 'Specialized in detecting and repairing water leaks.'},
    {'id_number': 'PL3456789', 'years_of_experience': 4, 'services_offered': 'drain cleaning', 'rates': '800', 'about_me': 'Proficient in clearing blocked drains and pipes.'},
    {'id_number': 'PL4567890', 'years_of_experience': 7, 'services_offered': 'sewer line repair', 'rates': '1500', 'about_me': 'Expert in sewer line installation and repair.'},
    {'id_number': 'PL5678901', 'years_of_experience': 8, 'services_offered': 'full residential plumbing', 'rates': '2000', 'about_me': 'Experienced in residential plumbing, including installation and maintenance.'},
    {'id_number': 'PL6789012', 'years_of_experience': 3, 'services_offered': 'emergency plumbing services', 'rates': '2500', 'about_me': 'Available for emergency plumbing repairs at any time.'},
]


# Create chat room data
chat_rooms_data = [
    {'user_id': 1, 'plumber_id': 2},  # Chat between user 1 and plumber 2
    {'user_id': 3, 'plumber_id': 4},  # Chat between user 3 and plumber 4
]

# Create message data
messages_data = [
    {'chatroom_id': 1, 'sender_id': 1, 'receiver_id': 2, 'content': 'Hi, I need help with plumbing.'},
    {'chatroom_id': 1, 'sender_id': 2, 'receiver_id': 1, 'content': 'Sure, I can assist you with that.'},
    {'chatroom_id': 2, 'sender_id': 3, 'receiver_id': 4, 'content': 'Can you help with electrical wiring?'},
    {'chatroom_id': 2, 'sender_id': 4, 'receiver_id': 3, 'content': 'Yes, I can help with that.'},
]

def seed_database():
    with app.app_context():
        # Clear existing data
        db.session.query(Message).delete()
        db.session.query(ChatRoom).delete()
        db.session.query(Profile).delete()
        db.session.query(PlumberDetail).delete()
        db.session.query(User).delete()
        db.session.commit()
        
        users = []
        
        # Add users and commit to get their IDs
        for user_data in users_data:
            user = User(
                username=user_data['username'],
                email=user_data['email'],
                password_hash=generate_password_hash(user_data['password']),
                is_plumber=user_data['is_plumber']
            )
            db.session.add(user)
            users.append(user)
        db.session.commit()  # This will generate the IDs
        
        chat_rooms = []  # Reset chat_rooms before creating new ones

        # Create chat rooms
        for chatroom_data in chat_rooms_data:
            # Check if both user_id and plumber_id are valid
            user_exists = any(user.id == chatroom_data['user_id'] for user in users)
            plumber_exists = any(user.id == chatroom_data['plumber_id'] for user in users if user.is_plumber)
            if user_exists and plumber_exists:
                chatroom = ChatRoom(
                    user_id=chatroom_data['user_id'],
                    plumber_id=chatroom_data['plumber_id']
                )
                db.session.add(chatroom)
                chat_rooms.append(chatroom)  # Store the chatroom object
        db.session.commit()  # Commit chat rooms before inserting messages

        # Create messages
        for message_data in messages_data:
            # Ensure chatroom_id exists in the committed chat_rooms
            if message_data['chatroom_id'] in [chatroom.id for chatroom in chat_rooms]:
                message = Message(
                    chatroom_id=message_data['chatroom_id'],
                    sender_id=message_data['sender_id'],
                    receiver_id=message_data['receiver_id'],
                    content=message_data['content'],
                    timestamp=datetime.now()  # Optional
                )
                db.session.add(message)
        db.session.commit()
        
        # Add profiles using the user IDs
        for i, profile_data in enumerate(profiles_data):
            profile = Profile(
                user_id=users[i].id,  # Assign the generated user ID
                first_name=profile_data['first_name'],
                last_name=profile_data['last_name'],
                phone_number=profile_data['phone_number'],
                location=profile_data['location'],
                image=profile_data['image']
            )
            db.session.add(profile)
        db.session.commit()

        # Add plumber details only for plumbers
        for i, detail_data in enumerate(plumber_details_data):
            if i < len(users):  # Ensure we have a corresponding user
                detail = PlumberDetail(
                    user_id=users[i].id,  # Assign the generated user ID
                    id_number=detail_data['id_number'],
                    years_of_experience=detail_data['years_of_experience'],
                    services_offered=detail_data['services_offered'],
                    rates=detail_data['rates'],
                    about_me=detail_data['about_me']
                )
                db.session.add(detail)
        db.session.commit()

        

if __name__ == '__main__':
    seed_database()
