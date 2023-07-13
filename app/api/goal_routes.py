from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Instrument, Goal, PracticeSession, Repertoire, Achievement

goal_routes = Blueprint(
    "goals",
    __name__,
)


#! ===== GOALS =====
@goal_routes.route("/goals")
@login_required
def get_all_goals(user_id):
    """
    Get all user goals
    """


@goal_routes.route("/goals/<int:goal_id>")
@login_required
def get_single_goal(user_id, goal_id):
    """
    Get single user goal
    """


@goal_routes.route("/goals", methods=["POST"])
@login_required
def create_new_goal(user_id):
    """
    Create new user goal
    """


@goal_routes.route("/goals/<int:goal_id>", methods=["PUT"])
@login_required
def edit_goal(user_id, goal_id):
    """
    Edit user goal
    """


@goal_routes.route("/goals/<int:goal_id>", methods=["DELETE"])
@login_required
def delete_goal(user_id, goal_id):
    """
    Delete user goal
    """
