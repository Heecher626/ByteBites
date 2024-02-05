import { useNavigate } from "react-router-dom"
import { FaStar } from "react-icons/fa";

export default function RestaurantCard({restaurant}) {
    const navigate = useNavigate()

    return(
        <div onClick={() => navigate(`/restaurants/${restaurant.id}`)} className="restaurant-card">
            <div className="restaurant-card-name">{restaurant.name}</div>
            <img className="restaurant-card-image" src={restaurant.preview_image_url}/>
            <div className="restaurant-card-star-line">{restaurant.stars >= 0 ? (<><FaStar className="star" /> {Math.round(restaurant.stars * 100) / 100}</>) : 'No reviews'}</div>
        </div>
    )
}
