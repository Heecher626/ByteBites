from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from flask import Blueprint, request, make_response
from app.models import Restaurant, db
from ..forms import RestaurantForm, UpdateRestaurantForm

restaurant_routes = Blueprint('restaurant', __name__)

@restaurant_routes.route('/')
def get_all_restaurants():
    """
    Returns a list of all restaurants
    """

    restaurants = [restaurant.to_dict() for restaurant in Restaurant.query.all()]

    return restaurants

@restaurant_routes.route('/<int:id>')
def get_restaurant_by_id(id):
    """
    Returns a specific restaurant specified by id
    """

    restaurant = Restaurant.query.get(id)

    return restaurant.to_dict(scope="detailed")

@restaurant_routes.route('/new', methods=['POST'])
@login_required
def create_restaurant():
    """
    Creates a new restaurant
    """

    form = RestaurantForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        preview_image_url = form.data["preview_image_url"]
        preview_image_url.filename = get_unique_filename(preview_image_url.filename)
        preview = upload_file_to_s3(preview_image_url)

        banner_image_url = form.data["banner_image_url"]
        banner_image_url.filename = get_unique_filename(banner_image_url.filename)
        banner = upload_file_to_s3(banner_image_url)

        if "url" not in preview:
            return preview

        if "url" not in banner:
            return banner

        new_restaurant = Restaurant(
            name = form.data['name'],
            preview_image_url = preview["url"],
            banner_image_url = banner["url"],
            description = form.data["description"],
            owner = current_user
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict()
    else:
        print(form.errors)
        return form.errors

@restaurant_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_restaurant(id):
    """
    Updates a restaurant
    """

    form = UpdateRestaurantForm()
    restaurant = Restaurant.query.get(id)
    form["csrf_token"].data = request.cookies["csrf_token"]

    if current_user.id != restaurant.owner_id:
        return make_response({ "errors": { "message": "forbidden"} }, 401)

    if form.validate_on_submit():


        if form.data['name']:
            restaurant.name = form.data['name']

        print('PREVIEW IMAGE URL: ', form.data["preview_image_url"])
        if form.data["preview_image_url"] != '':
            old_preview = restaurant.preview_image_url
            new_preview = form.data["preview_image_url"]
            new_preview.filename = get_unique_filename(new_preview.filename)
            preview_upload = upload_file_to_s3(new_preview)

            if "url" not in preview_upload:
                return preview_upload

            remove_file_from_s3(old_preview)
            restaurant.preview_image_url = preview_upload['url']

        if form.data["banner_image_url"] != '':
            old_banner = restaurant.banner_image_url
            new_banner = form.data["banner_image_url"]
            new_banner.filename = get_unique_filename(new_banner.filename)
            banner_upload = upload_file_to_s3(new_banner)

            if "url" not in banner_upload:
                return banner_upload

            remove_file_from_s3(old_banner)
            restaurant.banner_image_url = banner_upload['url']

        if form.data['description']:
            restaurant.description = form.data['description']

        db.session.commit()

        return restaurant.to_dict()
    else:
        print(form.errors)
        return(form.errors)

@restaurant_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_restaurant(id):

    restaurant = Restaurant.query.get(id)

    if current_user.id != restaurant.owner_id:
        return make_response({ "errors": { "message": "forbidden"} }, 401)

    old_banner = restaurant.banner_image_url
    old_preview = restaurant.preview_image_url

    db.session.delete(restaurant)
    db.session.commit()

    remove_file_from_s3(old_banner)
    remove_file_from_s3(old_preview)
    return {"message": "Successfully Deleted"}
