from flask.cli import AppGroup
from .users import seed_users, undo_users
from .instruments import seed_instruments, undo_instruments
from .achievements import seed_achievements, undo_achievements
from .goals import seed_goals, undo_goals
from .practice_sessions import seed_practice_sessions, undo_practice_sessions
from .repertoire import seed_repertoire, undo_repertoire

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_repertoire()
        undo_practice_sessions()
        undo_goals()
        undo_instruments()
        undo_achievements()
        undo_users()
    seed_users()
    seed_instruments()
    seed_achievements()
    seed_goals()
    seed_practice_sessions()
    seed_repertoire()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_repertoire()
    undo_practice_sessions()
    undo_goals()
    undo_instruments()
    undo_achievements()
    undo_users()
