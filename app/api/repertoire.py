from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Instrument, Goal, PracticeSession, Repertoire, Achievement

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


@repertoire_routes.route("/repertoire", methods=["POST"])
@login_required
def create_new_song_in_repertoire(user_id, session_id):
    """
    Create new song in user's repertoire
    """
