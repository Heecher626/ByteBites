import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { oneRestaurantThunk } from "../../redux/restaurants"
import { useEffect } from "react"
import DeleteRestaurantModal from "./DeleteRestaurantModal"
import OpenModalButton from "../OpenModalButton"
import ItemCard from "./ItemCard"

import './OneRestaurant.css'

export default function OneRestaurant() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { restaurantId } = useParams();
    const restaurant = useSelector ((state) => state.restaurants[restaurantId])
    const user = useSelector ((state) => state.session.user)

    useEffect(() => {
        const getRestaurant = async () => {
            await dispatch(oneRestaurantThunk(restaurantId))
        }

        getRestaurant()
    }, [dispatch, restaurantId])

    let items;
    if(restaurant != undefined) {
        if (restaurant.items) {
            items = Object.values(restaurant.items)
        }
    }

    return restaurant &&  (
        <div className="one-restaurant-page">
            <div className="one-restaurant-page-content">
                <div className="one-restaurant-header">
                    <img className="one-restaurant-banner-image" src={restaurant.banner_image_url}/>
                    <div className="one-restaurant-name">{restaurant.name}</div>
                </div>
                <div className="one-restaurant-description ">{restaurant.description}</div>
                    {!restaurant.items ? null : restaurant.items.length ? (
                        <div className="items-grid">
                            {items.map( item => (
                            <ItemCard item={item} key={item.id} />))}
                        </div>
                    ) : <div>No items yet!</div>}




                <OpenModalButton modalComponent={<DeleteRestaurantModal restaurantId={restaurantId}/>} buttonText={"Delete Restaurant"} />
                <button onClick={(e) => navigate(`/restaurants/${restaurantId}/update`)}>Update Restaurant</button>
            </div>

        </div>
    )
}
