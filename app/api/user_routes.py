from flask import Blueprint
from flask_login import login_required
from app.models import User
from .instrument_routes import instrument_routes
from .goal_routes import goal_routes
from .practice_sessions_routes import practice_session_routes
from .repertoire_routes import repertoire_routes

user_routes = Blueprint("users", __name__)


user_routes.register_blueprint(instrument_routes, url_prefix="/<int:user_id>")
user_routes.register_blueprint(goal_routes, url_prefix="/<int:user_id>")
user_routes.register_blueprint(practice_session_routes, url_prefix="/<int:user_id>")
user_routes.register_blueprint(repertoire_routes, url_prefix="/<int:user_id>")


#! ===== USERS =====
@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
