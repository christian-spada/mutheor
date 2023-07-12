from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint("users", __name__)


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


#! ===== INSTRUMENTS =====
@user_routes.route("/<int:user_id>/instruments")
@login_required
def get_all_instruments(user_id):
    """
    Query for all user instruments and return as dictionary
    """


@user_routes.route("/<int:user_id>/instruments/<int:instrument_id>")
@login_required
def get_single_instrument(user_id, instrument_id):
    """
    Query for single user instrument and return as dictionary
    """


@user_routes.route("/<int:user_id>/instruments", method=["POST"])
@login_required
def create_new_instrument(user_id):
    """
    Create new instrument in DB and return dictionary of new instrument
    """


@user_routes.route("/<int:user_id>/instruments/<int:instrument_id>", methods=["PUT"])
@login_required
def edit_instrument(user_id, instrument_id):
    """
    Edit new instrument in DB and return dictionary of new instrument
    """


@user_routes.route("/<int:user_id>/instruments/<int:instrument_id>", methods=["DELETE"])
@login_required
def delete_instrument(user_id, instrument_id):
    """
    Delete instrument by id
    """


#! ===== GOALS =====
@user_routes.route("/<int:user_id>/goals")
@login_required
def get_all_goals(user_id):
    """
    Get all user goals
    """


@user_routes.route("/<int:user_id>/goals/<int:goal_id>")
@login_required
def get_single_goal(user_id, goal_id):
    """
    Get single user goal
    """


@user_routes.route("/<int:user_id>/goals", methods=["POST"])
@login_required
def create_new_goal(user_id):
    """
    Create new user goal
    """


@user_routes.route("/<int:user_id>/goals/<int:goal_id>", methods=["PUT"])
@login_required
def edit_goal(user_id, goal_id):
    """
    Edit user goal
    """


@user_routes.route("/<int:user_id>/goals/<int:goal_id>", methods=["DELETE"])
@login_required
def delete_goal(user_id, goal_id):
    """
    Delete user goal
    """


#! ===== Practice Sessions =====
@user_routes.route("/<int:user_id>/sessions")
@login_required
def get_all_sessions(user_id):
    """
    Get all user practice sessions
    """


@user_routes.route("/<int:user_id>/sessions/<int:session_id>")
@login_required
def get_single_session(user_id, session_id):
    """
    Get single user practice session
    """


@user_routes.route("/<int:user_id>/sessions", methods=["POST"])
@login_required
def create_new_session(user_id):
    """
    Create new user practice session
    """


#! ===== REPERTOIRE =====
@user_routes.route("/<int:user_id>/repertoire")
@login_required
def get_all_songs_in_repertoire(user_id):
    """
    Get all songs in user's repertiore
    """


@user_routes.route("/<int:user_id>/repertoire", methods=["POST"])
@login_required
def create_new_song_in_repertoire(user_id, session_id):
    """
    Create new song in user's repertoire
    """
