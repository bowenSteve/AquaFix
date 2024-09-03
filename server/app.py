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
































if __name__ == '__main__':
    app.run(debug=True)