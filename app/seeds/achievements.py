from app.models import db, Achievement, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_achievements():
    ach1 = Achievement(user_id=1, type="Complete 1 Goal", reward="The Starter")
    ach2 = Achievement(
        user_id=2,
        type="Complete 5 Goals",
        reward="The Committer",
    )
    ach3 = Achievement(user_id=1, type="Complete 10 Goals", reward="The Doer")

    db.session.add(ach1)
    db.session.add(ach2)
    db.session.add(ach3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_achievements():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.achievements RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM achievements"))

    db.session.commit()
