from app.models import db, Instrument, environment, SCHEMA
from sqlalchemy.sql import text


def seed_instruments():
    inst1 = Instrument(
        user_id=1,
        type="Electric Guitar",
        model="Fender Strat",
        category="String",
        image="https://my-mutheor-user-images-bucket.s3.amazonaws.com/fender-strat.jpg",
    )
    inst2 = Instrument(
        user_id=1,
        type="Bongos",
        model="Tama 210",
        category="Percussion",
        image="https://my-mutheor-user-images-bucket.s3.amazonaws.com/DW-C70-bongos.jpg",
    )
    inst3 = Instrument(
        user_id=2,
        type="Piano",
        model="Yamaha C350",
        category="Percussion",
        image="https://my-mutheor-user-images-bucket.s3.amazonaws.com/piano-yamaha-C50.jpg",
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
