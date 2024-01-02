from .db import db, add_prefix_for_prod
import os


environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(5000), nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="reviews")
    reviewer = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return_dict = {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "reviewer_id": self.reviewer_id,
            "stars": self.stars,
            "content": self.content
        }

        return return_dict
