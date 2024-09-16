from app import app
from models import db, User, Profile, PlumberDetail
from werkzeug.security import generate_password_hash

# Create user data
users_data = [
    {'username': 'john_doe', 'email': 'john@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'alice_smith', 'email': 'alice@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'bob_jones', 'email': 'bob@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'carol_white', 'email': 'carol@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'dave_black', 'email': 'dave@example.com', 'password': 'password', 'is_plumber': True},
    {'username': 'eve_green', 'email': 'eve@example.com', 'password': 'password', 'is_plumber': True},
]

# Create profile data (without user_id)
profiles_data = [
    {'first_name': 'John', 'last_name': 'Doe', 'phone_number': '123-456-7890', 'location': 'New York','image':'https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Alice', 'last_name': 'Smith', 'phone_number': '123-456-7891', 'location': 'Los Angeles','image':'https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Bob', 'last_name': 'Jones', 'phone_number': '123-456-7892', 'location': 'Chicago', 'image':'https://images.unsplash.com/photo-1533108344127-a586d2b02479?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Carol', 'last_name': 'White', 'phone_number': '123-456-7893', 'location': 'Houston', 'image':'https://images.unsplash.com/photo-1529663557617-39f3243b531a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Dave', 'last_name': 'Black', 'phone_number': '123-456-7894', 'location': 'Phoenix', 'image':'https://images.unsplash.com/photo-1551692703-f4941f2f0f6a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    {'first_name': 'Eve', 'last_name': 'Green', 'phone_number': '123-456-7895', 'location': 'Philadelphia', 'image':'https://images.unsplash.com/photo-1531299102504-fc718f23c100?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
]

# Create plumber details data (including about_me)
plumber_details_data = [
    {'id_number': 'PL1234567', 'years_of_experience': 5, 'services_offered': 'pipe installation', 'rates': '1000', 'about_me': 'Experienced in pipe installation and repair.'},
    {'id_number': 'PL2345678', 'years_of_experience': 6, 'services_offered': 'welding', 'rates': '2000', 'about_me': 'Skilled welder with expertise in various welding techniques.'},
    {'id_number': 'PL3456789', 'years_of_experience': 4, 'services_offered': 'carpentry', 'rates': '1500', 'about_me': 'Proficient in carpentry with a focus on custom woodwork.'},
    {'id_number': 'PL4567890', 'years_of_experience': 7, 'services_offered': 'electrical wiring', 'rates': '3000', 'about_me': 'Certified electrician with extensive experience in wiring and repairs.'},
    {'id_number': 'PL5678901', 'years_of_experience': 8, 'services_offered': 'plumbing', 'rates': '2000', 'about_me': 'Expert plumber specializing in residential and commercial plumbing services.'},
    {'id_number': 'PL6789012', 'years_of_experience': 3, 'services_offered': 'painting', 'rates': '2500', 'about_me': 'Creative painter with a keen eye for detail and design.'},
]
def seed_database():
    with app.app_context():
        # Clear existing data
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

        # Add plumber details using the user IDs
        for i, detail_data in enumerate(plumber_details_data):
            detail = PlumberDetail(
                user_id=users[i].id,  # Assign the generated user ID
                id_number=detail_data['id_number'],
                years_of_experience=detail_data['years_of_experience'],
                services_offered=detail_data['services_offered'],
                rates=detail_data['rates'],
                about_me=detail_data['about_me']  # Add the about_me field
            )
            db.session.add(detail)
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_database()
        print("Database has been seeded.")
