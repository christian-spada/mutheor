from app.models import db, Repertoire, environment, SCHEMA
from sqlalchemy.sql import text


def seed_repertoire():
    rep1 = Repertoire(
        user_id=1, instrument_id=1, song_title="In Undertow", artist="Alvvays"
    )
    rep2 = Repertoire(
        user_id=1, instrument_id=1, song_title="Soul Sacrifice", artist="Santana"
    )
    rep3 = Repertoire(
        user_id=2, instrument_id=3, song_title="Higher", artist="D'Angelo"
    )

    db.session.add(rep1)
    db.session.add(rep2)
    db.session.add(rep3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_repertoire():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.repertoire RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM repertoire"))

    db.session.commit()
