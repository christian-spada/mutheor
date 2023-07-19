from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.utils import (
    entity_not_found,
    not_authorized,
    bad_request,
    attach_csrf_token,
    logger,
)
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
from app.api.aws_helpers import (
    upload_file_to_s3,
    remove_file_from_s3,
    get_unique_filename,
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

    # TODO - Add check if user exists?
    instrument = Instrument.query.get(instrument_id)
    if instrument == None:
        return entity_not_found("Instrument")

    user = instrument.user.to_dict()

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

        image = data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return bad_request(form.errors)

        url = upload["url"]

        new_instrument = Instrument(
            user_id=data["user_id"],
            model=data["model"],
            type=data["type"],
            category=data["category"],
            image=url,
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

        if data["image"] == None:
            #! if user chose not to update image, update the other required fields and return before S3 processing
            instrument_to_edit.type = data["type"]
            instrument_to_edit.category = data["category"]
            instrument_to_edit.model = data["model"]

            db.session.commit()
            return instrument_to_edit.to_dict()

        image = data["image"]

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return bad_request(form.errors)

        url = upload["url"]

        instrument_to_edit.type = data["type"]
        instrument_to_edit.category = data["category"]
        instrument_to_edit.model = data["model"]
        instrument_to_edit.image = url

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
