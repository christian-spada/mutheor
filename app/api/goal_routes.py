from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from datetime import date
from app.models import (
    db,
    User,
    Instrument,
    Goal,
    PracticeSession,
    Repertoire,
    Achievement,
)
from app.utils import not_authorized, entity_not_found, logger

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

    goals = Goal.query.filter_by(user_id=user_id).all()

    return {"goals": [goal.to_dict() for goal in goals]}


@goal_routes.route("/goals/<int:goal_id>")
@login_required
def get_single_goal(user_id, goal_id):
    """
    Get single user goal
    """

    goal = Goal.query.get(goal_id)
    if goal == None:
        return entity_not_found("Goal")

    user = goal.user.to_dict()

    return {**goal.to_dict(), "user": user}


@goal_routes.route("/goals", methods=["POST"])
@login_required
def create_new_goal(user_id):
    """
    Create new user goal
    """

    if current_user.id != user_id:
        return not_authorized()

    # TODO - Instrument.id is hardcoded. Add value from form when you add it on the frontend
    try:
        instrument = Instrument.query.filter(
            and_(Instrument.user_id == user_id, Instrument.id == 1)
        ).one()
    except:
        return entity_not_found("Instrument")

    date_input = request.form["target_date"].split("/")

    new_goal = Goal(
        user_id=user_id,
        instrument_id=instrument.id,
        description=request.form["description"],
        target_date=date(*[int(num) for num in date_input]),
    )

    db.session.add(new_goal)
    db.session.commit()

    return new_goal.to_dict()


@goal_routes.route("/goals/<int:goal_id>", methods=["PUT"])
@login_required
def edit_goal(user_id, goal_id):
    """
    Edit user goal
    """

    if current_user.id != user_id:
        return not_authorized()

    try:
        goal = Goal.query.filter(
            and_(Goal.user_id == user_id, Goal.id == goal_id)
        ).one()
    except:
        return entity_not_found("Goal")

    date_input = None
    if request.form.get("target_date"):
        date_input = request.form["target_date"].split("/")

    goal.description = (
        request.form["description"]
        if request.form.get("description")
        else goal.description
    )

    goal.target_date = (
        date(*[int(num) for num in date_input]) if date_input else goal.target_date
    )
    db.session.commit()

    return goal.to_dict()


@goal_routes.route("/goals/<int:goal_id>", methods=["DELETE"])
@login_required
def delete_goal(user_id, goal_id):
    """
    Delete user goal
    """

    if current_user.id != user_id:
        return not_authorized()

    try:
        goal = Goal.query.filter(
            and_(Goal.user_id == user_id, Goal.id == goal_id)
        ).one()
    except:
        return entity_not_found("Goal")

    db.session.delete(goal)
    db.session.commit()

    return {"message": "Successfully deleted goal"}
