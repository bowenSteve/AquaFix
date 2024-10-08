from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(250), nullable=False)
    is_plumber = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_profile = db.Column(db.Boolean, default=False)

    profile = db.relationship('Profile', backref='user', uselist=False)
    plumber_details = db.relationship('PlumberDetail', backref='user', uselist=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String)

    def __repr__(self):
        return f'<Profile {self.first_name} {self.last_name}>'

class PlumberDetail(db.Model):
    __tablename__ = 'plumber_details'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    id_number = db.Column(db.String(9), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    services_offered = db.Column(db.String(250), nullable=False)
    rates = db.Column(db.Integer)
    about_me = db.Column(db.String(500), nullable=True) 

    def __repr__(self):
        return f'<PlumberDetail {self.id_number}>'

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    chatroom_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Renamed from `receiver_id` to `recipient_id`
    content = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    sender = relationship('User', foreign_keys=[sender_id])
    recipient = relationship('User', foreign_keys=[receiver_id])

    def __repr__(self):
        return f'<Message from {self.sender_id} to {self.receiver_id}: {self.content}>'

class ChatRoom(db.Model):
    __tablename__ = 'chat_rooms'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Client ID
    plumber_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Plumber ID
    messages = db.relationship('Message', backref='chatroom', lazy=True, cascade="all, delete-orphan")
    
    def __repr__(self):
        return f'<ChatRoom {self.user_id} - {self.plumber_id}>'
