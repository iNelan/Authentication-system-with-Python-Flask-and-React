"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

# A PARTIR DE AQUI COMIENZA

@api.route("/register", methods=["POST"])
def registro():
    body = json.loads(request.data) 
    #llamar de current_app la propiedad bcrypt que agregaste en app.py
    hashed_password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')
    print(hashed_password)
    
    user = User(email = body["email"], password = hashed_password)
    print(user)
    db.session.add(user)
    db.session.commit()
    response_body = {
        "results": "User has been added"
    }
    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    # almacenamos la solicitud JSON obtenida de email y password
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # almacenamos la primera coincidencia de email en User
    user = User.query.filter_by(email = email).first()
    # Si el email o password no coindicen retornamos error de autentificacion
    if email != user.email or password != user.password:
        if email != user.email or not current_app.bcrypt.check_password_hash(user.password, password):
            return jsonify({"msg": "Bad username or password"}), 401

    return jsonify({"token": create_access_token(identity=email)})

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()
    return jsonify(user.serialize()), 200


if __name__ == "__main__":
    app.run()