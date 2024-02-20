from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from flask import Blueprint, request, make_response
from app.models import Restaurant, Item, Cart, db
from ..forms import ItemForm

item_routes = Blueprint('item', __name__)

@item_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_item(id):
    """
    Updates an item
    """

    form = ItemForm()
    item = Item.query.get(id)
    form["csrf_token"].data = request.cookies["csrf_token"]

    restaurant = item.restaurant
    if current_user.id != restaurant.owner_id:
        return make_response({ "errors": { "message": "forbidden"} }, 401)

    if form.validate_on_submit():

        if form.data['name']:
            item.name = form.data['name']

        if form.data['description']:
            item.description = form.data['description']

        if form.data['price_cents']:
            item.price_cents = form.data['price_cents']

        if form.data["image"] != '':
            old_url = item.image_url
            new_file = form.data["image"]
            new_file.filename = get_unique_filename(new_file.filename)
            upload = upload_file_to_s3(new_file)

            if "url" not in upload:
                return upload

            if old_url:
                remove_file_from_s3(old_url)
            item.image_url = upload['url']

        db.session.commit()

        return restaurant.to_dict()

    else:
        print(form.errors)
        return form.errors

@item_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_item(id):
    """
    Deletes an item
    """

    item = Item.query.get(id)
    restaurant = item.restaurant

    if current_user.id != restaurant.owner_id:
        return make_response({ "errors": { "message": "forbidden"} }, 401)

    old_image = "Unassigned"

    if item.to_dict()["image_url"] != None:
        old_image = item.image_url

    db.session.delete(item)
    db.session.commit()

    if old_image != "Unassigned":
        remove_file_from_s3(old_image)
    return restaurant.to_dict()

@item_routes.route('/<int:id>/cart', methods=['POST'])
@login_required
def add_to_cart(id):
    """
    Adds an item to a user's cart
    """

    item = Item.query.get(id)

    if not current_user.cart:
        cart = Cart(
            user = current_user
        )

        db.session.add(cart)

    cart = current_user.cart[0]

    cart.items.append(item)
    db.session.commit()

    return current_user.to_dict()
