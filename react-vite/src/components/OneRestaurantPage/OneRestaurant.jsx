import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { oneRestaurantThunk } from "../../redux/restaurants"
import { useEffect } from "react"
import DeleteRestaurantModal from "./DeleteRestaurantModal"
import OpenModalButton from "../OpenModalButton"
import ItemCard from "./ItemCard"

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
        <div>
            <img src={restaurant.banner_image_url}/>
            <div>{restaurant.name}</div>
            <div>{restaurant.description}</div>

            {restaurant.items.length && items.map( item => (
                <ItemCard item={item} key={item.id} />
            ))}


            <OpenModalButton modalComponent={<DeleteRestaurantModal restaurantId={restaurantId}/>} buttonText={"Delete Restaurant"} />
            <button onClick={(e) => navigate(`/restaurants/${restaurantId}/update`)}>Update Restaurant</button>

        </div>
    )
}
