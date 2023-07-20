from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        profile_pic="https://my-mutheor-user-images-bucket.s3.amazonaws.com/pexels-stefan-stefancik-91227.jpg",
        password="password",
    )
    jess = User(
        username="Jess",
        email="jess@aa.io",
        profile_pic="https://my-mutheor-user-images-bucket.s3.amazonaws.com/pexels-andrea-piacquadio-762020.jpg",
        password="password",
    )
    derek = User(
        username="Derek",
        email="derek@aa.io",
        profile_pic="https://my-mutheor-user-images-bucket.s3.amazonaws.com/pexels-moose-photos-1036623.jpg",
        password="password",
    )

    db.session.add(demo)
    db.session.add(jess)
    db.session.add(derek)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
