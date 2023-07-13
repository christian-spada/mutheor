from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_, or_
from app.utils import entity_not_found, not_authorized
from app.models import (
    db,
    User,
    Instrument,
    Goal,
    PracticeSession,
    Repertoire,
    Achievement,
)

instrument_routes = Blueprint(
    "instruments",
    __name__,
)


#! ===== INSTRUMENTS =====
@instrument_routes.route("/instruments")
@login_required
def get_all_instruments(user_id):
    """
    Query for all user instruments and return as dictionary
    """

    instruments = Instrument.query.filter_by(user_id=user_id).all()

    return {"instruments": [inst.to_dict() for inst in instruments]}


@instrument_routes.route("/instruments/<int:instrument_id>")
@login_required
def get_single_instrument(user_id, instrument_id):
    """
    Query for single user instrument and return as dictionary
    """

    instrument = Instrument.query.get(instrument_id)
    user = instrument.user.to_dict()

    return {**instrument.to_dict(), "user": user}


@instrument_routes.route("/instruments", methods=["POST"])
@login_required
def create_new_instrument(user_id):
    """
    Create new instrument in DB and return dictionary of new instrument
    """

    new_instrument = Instrument(
        user_id=user_id,
        type=request.form["type"],
        category=request.form["category"],
        image=request.form["image"],
    )

    db.session.add(new_instrument)
    db.session.commit()

    return new_instrument.to_dict()


@instrument_routes.route("/instruments/<int:instrument_id>", methods=["PUT"])
@login_required
def edit_instrument(user_id, instrument_id):
    """
    Edit new instrument in DB and return dictionary of new instrument
    """

    if current_user.id != user_id:
        return not_authorized()

    try:
        instrument = Instrument.query.filter(
            and_(Instrument.id == instrument_id, Instrument.user_id == user_id)
        ).one()
    except:
        return entity_not_found("Instrument")

    return instrument.to_dict()


@instrument_routes.route("/instruments/<int:instrument_id>", methods=["DELETE"])
@login_required
def delete_instrument(user_id, instrument_id):
    """
    Delete instrument by id
    """

    if current_user.id != user_id:
        return not_authorized()

    try:
        instrument = Instrument.query.filter(
            and_(Instrument.id == instrument_id, Instrument.user_id == user_id)
        ).one()
        db.session.delete(instrument)
        db.session.commit()
    except:
        return entity_not_found("Instrument")

    return {"message": "Successfully deleted instrument"}
