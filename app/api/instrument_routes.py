from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.utils import entity_not_found, not_authorized, attach_csrf_token
from app.forms import CreateInstrumentForm, EditInstrumentForm
from app.models import (
    db,
    User,
    Instrument,
    Goal,
    PracticeSession,
    Repertoire,
    Achievement,
)
from app.utils import logger, bad_request

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

    # TODO - Add check if user exists?
    try:
        instrument = Instrument.query.get(instrument_id)
        user = instrument.user.to_dict()
    except:
        return entity_not_found("Instrument")

    return {**instrument.to_dict(), "user": user}


@instrument_routes.route("/instruments", methods=["POST"])
@login_required
def create_new_instrument(user_id):
    """
    Create new instrument in DB and return dictionary of new instrument
    """

    if current_user.id != user_id:
        return not_authorized()

    form = CreateInstrumentForm()
    attach_csrf_token(form, request)

    if form.validate_on_submit():
        data = form.data
        new_instrument = Instrument(
            user_id=data["user_id"],
            nickname=data["nickname"],
            type=data["type"],
            category=data["category"],
            image=data["image"],
        )

        db.session.add(new_instrument)
        db.session.commit()

        return new_instrument.to_dict()

    return bad_request(form.errors)


@instrument_routes.route("/instruments/<int:instrument_id>", methods=["PUT"])
@login_required
def edit_instrument(user_id, instrument_id):
    """
    Edit instrument in DB and return dictionary of updated instrument
    """

    if current_user.id != user_id:
        return not_authorized()

    try:
        instrument_to_edit = Instrument.query.filter(
            and_(Instrument.id == instrument_id, Instrument.user_id == user_id)
        ).one()
    except:
        return entity_not_found("Instrument")

    form = EditInstrumentForm()
    attach_csrf_token(form, request)

    if form.validate_on_submit():
        data = form.data
        instrument_to_edit.type = data["type"]
        instrument_to_edit.category = data["category"]
        instrument_to_edit.nickname = data["nickname"]
        instrument_to_edit.image = data["image"]

        db.session.commit()

        return instrument_to_edit.to_dict()

    return bad_request(form.errors)


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
