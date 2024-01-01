from .db import db, add_prefix_for_prod
from .review import Review
import os
import statistics

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __tableargs__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(4000), nullable=False)
    preview_image_url = db.Column(db.String(255), nullable=False)
    banner_image_url = db.Column(db.String(255), nullable=False)

    owner = db.relationship("User", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurant")
    items = db.relationship("Item", back_populates='restaurant')


    def to_dict(self, scope="default"):
        return_dict = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "preview_image_url": self.preview_image_url,
            "banner_image_url": self.banner_image_url
        }

        if len(self.reviews) > 0:
            return_dict["stars"] = statistics.mean([review.stars for review in self.reviews])
        else:
            return_dict["stars"] = -1

        if scope == "detailed":
            return_dict["reviews"] = [review.to_dict() for review in self.reviews]
            return_dict["items"] = [item.to_dict() for item in self.items]


        return return_dict
