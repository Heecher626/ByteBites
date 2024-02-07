import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { oneRestaurantThunk } from "../../redux/restaurants";
import { useEffect, useState } from "react";
import DeleteRestaurantModal from "./DeleteRestaurantModal";
import OpenModalButton from "../OpenModalButton";
import ItemCard from "./ItemCard";
import { IoIosStar } from "react-icons/io";

import "./OneRestaurant.css";
import ReviewModal from "./ReviewModal";
import ReviewCard from "./ReviewCard";

export default function OneRestaurant() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const user = useSelector((state) => state.session.user);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const getRestaurant = async () => {
      await dispatch(oneRestaurantThunk(restaurantId));
      setHasLoaded(true);
    };

    getRestaurant();
  }, [dispatch, restaurantId]);

  let items;
  if (restaurant != undefined) {
    if (restaurant.items) {
      items = Object.values(restaurant.items);
    }
  }

  let isOwner = false;

  if (restaurant != undefined) {
    // if no user, then "user?" evaluates as undefined, making the overall code evaluate to falsey"
    isOwner = user?.id == restaurant.owner_id;
  }

  if (!hasLoaded) {
    return null;
  }

  return (
    restaurant && (
      <div className="one-restaurant-page">
        <div className="one-restaurant-page-content">
          <div className="one-restaurant-header">
            <img
              className="one-restaurant-banner-image"
              src={restaurant.banner_image_url}
            />
            <div className="one-restaurant-name">{restaurant.name}</div>
          </div>
          <div className="one-restaurant-description ">
            {restaurant.description}
          </div>

          {isOwner ? (
            <div className="one-restaurant-buttons-container">
              <button
                className="one-restaurant-button"
                onClick={() =>
                  navigate(`/restaurants/${restaurantId}/add-item`)
                }
              >
                Add a new Item
              </button>
              <button
                className="one-restaurant-button"
                onClick={() => navigate(`/restaurants/${restaurantId}/update`)}
              >
                Update Restaurant
              </button>
              <OpenModalButton
                modalComponent={
                  <DeleteRestaurantModal restaurantId={restaurantId} />
                }
                buttonText={"Delete Restaurant"}
                className={"one-restaurant-button"}
              />
            </div>
          ) : null}

          {!restaurant.items ? null : items.length ? (
            <div className="items-grid">
              {items.map((item) => (
                <ItemCard item={item} key={item.id} isOwner={isOwner} />
              ))}
            </div>
          ) : (
            <div className="no-items">No items yet!</div>
          )}

          {restaurant.reviews &&
            <div className="one-restaurant-review-header">
              <div className="one-restaurant-review-header-heading">Reviews for {restaurant.name}</div>
              <div className="one-restaurant-review-stars">
                { Math.round(restaurant.stars) >= 1 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { Math.round(restaurant.stars) >= 2 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { Math.round(restaurant.stars) >= 3 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { Math.round(restaurant.stars) >= 4 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { Math.round(restaurant.stars) >= 5 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
            </div>
              <div>{restaurant.reviews.length} reviews {restaurant.stars > -1 ? (<>· {Math.round(restaurant.stars * 100) / 100} <IoIosStar className="review-card-star"/></>) : null} </div>
            </div>
          }

          {restaurant.reviews && <div className="reviews-container">
            {restaurant.reviews.length ? (restaurant.reviews.map((review) => (
              <ReviewCard
                review={review}
                restaurant={restaurant}
                key={review.id}
              />
            ))) : null}

          </div>}

          {user && !isOwner && (
            <OpenModalButton
              modalComponent={
                <ReviewModal restaurant={restaurant} review={false} />
              }
              buttonText={`Add a Review`}
              className={"one-restaurant-button centered"}
            />
          )}
        </div>
      </div>
    )
  );
}
