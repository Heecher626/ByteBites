from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='Marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='Bobbie', email='bobbie@aa.io', password='password')
    jacob = User(
        username='Jacob', email='jacob@aa.io', password='password')
    sarah = User(
        username='Sarah', email='sarah@aa.io', password='password')
    alex = User(
        username='Alex', email='alex@aa.io', password='password')
    charlie = User(
        username='Charlie', email='charlie@aa.io', password='password')
    zoe = User(
        username='Zoe', email='zoe@aa.io', password='password')
    brooke = User(
        username='Brooke', email='brooke@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jacob)
    db.session.add(sarah)
    db.session.add(alex)
    db.session.add(charlie)
    db.session.add(zoe)
    db.session.add(brooke)
    db.session.commit()
    db.session.close()


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
