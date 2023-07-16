from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.forms import CreatePracticeSession
from app.models import (
    db,
    User,
    Instrument,
    Goal,
    PracticeSession,
    Repertoire,
    Achievement,
)
from app.utils import (
    bad_request,
    entity_not_found,
    not_authorized,
    logger,
    attach_csrf_token,
)

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
    practice_sessions = PracticeSession.query.filter_by(user_id=user_id).all()

    return {
        "practiceSessions": [sesh.to_dict() for sesh in practice_sessions],
    }


@practice_session_routes.route("/sessions/<int:session_id>")
@login_required
def get_single_session(user_id, session_id):
    """
    Get single user practice session
    """
    practice_session = PracticeSession.query.get(session_id)
    user = practice_session.user.to_dict()
    instrument = practice_session.instrument.to_dict()

    return {**practice_session.to_dict(), "user": user, "instrument": instrument}


@practice_session_routes.route("/sessions", methods=["POST"])
@login_required
def create_new_session(user_id):
    """
    Create new user practice session
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

    form = CreatePracticeSession()
    attach_csrf_token(form, request)

    if form.validate_on_submit():
        data = form.data

        new_practice_session = PracticeSession(
            user_id=user_id,
            instrument_id=instrument.id,
            duration=data["duration"],
            notes=data["notes"],
            date=data["date"],
            area_of_focus=data["area_of_focus"],
        )

        db.session.add(new_practice_session)
        db.session.commit()

        return new_practice_session.to_dict()

    return bad_request(form.errors)
