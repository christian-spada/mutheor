from app.models import db, PracticeSession, environment, SCHEMA
from sqlalchemy.sql import text


def seed_practice_sessions():
    sesh1 = PracticeSession(
        user_id=1,
        instrument_id=1,
        duration=112,
        notes="Practiced getting my economy picking faster. Now comfortably at 60 BPM for 16th notes",
        area_of_focus="Technique",
    )
    sesh2 = PracticeSession(
        user_id=1,
        instrument_id=2,
        duration=20,
        notes="Worked on the 3:4 and 3:2 polyrhythms",
        area_of_focus="Polyrhythms",
    )
    sesh3 = PracticeSession(
        user_id=3,
        instrument_id=3,
        duration=320,
        notes="Practiced chord voicings, specifically spread triads",
        area_of_focus="Chord Voicings",
    )

    db.session.add(sesh1)
    db.session.add(sesh2)
    db.session.add(sesh3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_practice_sessions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.practice_sessions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM practice_sessions"))

    db.session.commit()
