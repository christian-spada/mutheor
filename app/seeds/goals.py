from app.models import db, Goal, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_goals():
    goal1 = Goal(
        user_id=1,
        instrument_id=1,
        description="Master paradiddles",
        target_date=date(2023, 10, 12),
    )
    goal2 = Goal(
        user_id=2,
        instrument_id=2,
        description="Get economy picking 16th notes up to 90 BPM",
        target_date=date(2024, 2, 12),
    )
    goal3 = Goal(
        user_id=3,
        instrument_id=3,
        description="Master spread triad voicings",
        target_date=date(2024, 12, 11),
    )

    db.session.add(goal1)
    db.session.add(goal2)
    db.session.add(goal3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_goals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.goals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM goals"))

    db.session.commit()
