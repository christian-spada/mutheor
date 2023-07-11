from app.models import db, Instrument, environment, SCHEMA
from sqlalchemy.sql import text


def seed_instruments():
    inst1 = Instrument(
        user_id=1,
        type="Electric Guitar",
        category="string",
        image="https://images.pexels.com/photos/2646825/pexels-photo-2646825.jpeg",
    )
    inst2 = Instrument(
        user_id=1,
        type="Bongos",
        category="percussion",
        image="https://images.pexels.com/photos/9488150/pexels-photo-9488150.jpeg",
    )
    inst3 = Instrument(
        user_id=2,
        type="Piano",
        category="percussion",
        image="https://images.pexels.com/photos/1021142/pexels-photo-1021142.jpeg",
    )

    db.session.add(inst1)
    db.session.add(inst2)
    db.session.add(inst3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_instruments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.instruments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM instruments"))

    db.session.commit()
