from flask_login import login_required, current_user
from flask import Blueprint, request, make_response
from app.models import Restaurant, Review, db
from ..forms import ReviewForm

review_routes = Blueprint('review', __name__)

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def create_review(id):
    """
    Updates a review
    """

    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    review = Review.query.get(id)



    if form.validate_on_submit():
        review.stars = form.data["stars"]
        review.content = form.data["content"]
        db.session.commit()
        return review.restaurant.to_dict()

@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Deletes a review
    """

    review = Review.query.get(id)

    if current_user.id != review.reviewer_id:
        return make_response({ "errors": { "message": "forbidden"}}, 401)

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully Deleted"}
