from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Instrument, Goal, PracticeSession, Repertoire, Achievement

practice_session_routes = Blueprint(
    "practice_sessions",
    __name__,
)


#! ===== Practice Sessions =====
@practice_session_routes.route("/sessions")
@login_required
def get_all_sessions(user_id):
    """
    Get all user practice sessions
    """


@practice_session_routes.route("/sessions/<int:session_id>")
@login_required
def get_single_session(user_id, session_id):
    """
    Get single user practice session
    """


@practice_session_routes.route("/sessions", methods=["POST"])
@login_required
def create_new_session(user_id):
    """
    Create new user practice session
    """
