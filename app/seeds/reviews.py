from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        restaurant_id=1,
        reviewer_id=5,
        stars=4,
        content="I had the Spider Roll and it was pretty good"
    )
    review2 = Review(
        restaurant_id=1,
        reviewer_id=2,
        stars=5,
        content="Hands down the best sushi you'll find"
    )
    review3 = Review(
        restaurant_id=1,
        reviewer_id=3,
        stars=5,
        content="I absolutely loved it! Would order again!"
    )
    review4 = Review(
        restaurant_id=1,
        reviewer_id=4,
        stars=3,
        content="The fish was fresh, but the delivery was slow"
    )
    review5 = Review(
        restaurant_id=2,
        reviewer_id=2,
        stars=3,
        content="Was okay, wish the menu was bigger"
    )
    review6 = Review(
        restaurant_id=2,
        reviewer_id=4,
        stars=5,
        content="Best mexican food in the city!"
    )
    review7 = Review(
        restaurant_id=2,
        reviewer_id=6,
        stars=1,
        content="I got food poisoning after eating form here!"
    )
    review8 = Review(
        restaurant_id=3,
        reviewer_id=7,
        stars=4,
        content="The marsala was good, but the garlic bread was kinda dry"
    )
    review9 = Review(
        restaurant_id=3,
        reviewer_id=8,
        stars=4,
        content="Solid food, but nothing super groundbreaking"
    )
    review10 = Review(
        restaurant_id=3,
        reviewer_id=9,
        stars=5,
        content="Had the Penne and it was super yummy!"
    )
    review11 = Review(
        restaurant_id=2,
        reviewer_id=8,
        stars=5,
        content="Really appreciate the vegan option!"
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.commit()
    db.session.close()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
