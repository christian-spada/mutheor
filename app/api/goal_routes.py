from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.forms import CreateGoalForm, EditGoalForm
from app.models import (
    db,
    Instrument,
    Goal,
)
from app.utils import (
    bad_request,
    not_authorized,
    entity_not_found,
    logger,
    attach_csrf_token,
)

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

    form = CreateGoalForm()
    attach_csrf_token(form, request)

    try:
        instrument = Instrument.query.filter(
            and_(
                Instrument.user_id == user_id,
                Instrument.id == form.data["instrument_id"],
            )
        ).one()
    except:
        return entity_not_found("Instrument")

    if form.validate_on_submit():
        data = form.data

        new_goal = Goal(
            user_id=user_id,
            instrument_id=data["instrument_id"],
            description=data["description"],
            target_date=data["target_date"],
        )

        db.session.add(new_goal)
        db.session.commit()

        return new_goal.to_dict()

    return bad_request(form.errors)


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

    form = EditGoalForm()
    attach_csrf_token(form, request)

    if form.validate_on_submit():
        data = form.data

        goal.instrument_id = data["instrument_id"]
        goal.description = data["description"]
        goal.target_date = data["target_date"]

        db.session.commit()

        return goal.to_dict()

    return bad_request(form.errors)


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
