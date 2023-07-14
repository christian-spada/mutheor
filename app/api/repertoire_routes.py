from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import (
    db,
    User,
    Instrument,
    Goal,
    PracticeSession,
    Repertoire,
    Achievement,
)
from app.utils import entity_not_found, not_authorized, logger

repertoire_routes = Blueprint(
    "repertoire",
    __name__,
)


#! ===== REPERTOIRE =====
@repertoire_routes.route("/repertoire")
@login_required
def get_all_songs_in_repertoire(user_id):
    """
    Get all songs in user's repertiore
    """

    repertoire = Repertoire.query.filter_by(user_id=user_id).all()

    return {"repertoire": [rep.to_dict() for rep in repertoire]}


@repertoire_routes.route("/repertoire", methods=["POST"])
@login_required
def create_new_song_in_repertoire(user_id):
    """
    Create new song in user's repertoire
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

    new_repertoire = Repertoire(
        user_id=user_id,
        instrument_id=instrument.id,
        song_title=request.form["song_title"],
        artist=request.form["artist"],
    )

    db.session.add(new_repertoire)
    db.session.commit()

    return new_repertoire.to_dict()