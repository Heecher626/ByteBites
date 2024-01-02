from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')


cartItem = db.Table(
    'cartItems',
    db.Model.metadata,
    db.Column('cart_id', db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True),
)

if environment == "production":
    cartItem.schema = SCHEMA


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __tableargs__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),unique=True, nullable=False)

    user = db.relationship("User", back_populates="cart")

    items = db.relationship("Item", secondary=cartItem, back_populates="cart")

    def to_dict(self):
        return_dict = {
            "id": self.id,
            "user_id": self.user_id
        }

        return_dict["items"] = [item.to_dict() for item in self.items]

        return return_dict
