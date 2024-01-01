from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        restaurant_id=1,
        reviewer_id=1,
        stars=4,
        content="it was good"
    )
    review2 = Review(
        restaurant_id=1,
        reviewer_id=2,
        stars=5,
        content="it was amazing!"
    )
    review3 = Review(
        restaurant_id=1,
        reviewer_id=3,
        stars=1,
        content="i hated it"
    )
    review4 = Review(
        restaurant_id=1,
        reviewer_id=4,
        stars=1,
        content="will never order from here again!"
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
