from .db import db, add_prefix_for_prod
from .review import Review
import os
import statistics

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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
            "owner_id": self.owner_id,
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
            items_dict = {}
            item_dict_list = [item.to_dict() for item in self.items]
            for item in item_dict_list:
                items_dict[item["id"]] = item
            return_dict["items"] = items_dict


        return return_dict
