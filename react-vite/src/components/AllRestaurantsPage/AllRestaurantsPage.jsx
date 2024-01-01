import {useDispatch, useSelector} from "react-redux"
import { allRestaurantsThunk } from "../../redux/restaurants"
import { useEffect, useState } from "react"
import RestaurantCard from "./RestaurantCard";

export default function AllRestaurantsPage() {
    const dispatch = useDispatch();
    const allRestaurants = useSelector(state => Object.values(state.restaurants))

    useEffect(() => {
        const getRestaurants = async () => {
            await dispatch(allRestaurantsThunk())
        }

        getRestaurants()
    }, [dispatch])

    return(
        <div>
            {
                allRestaurants.map(restaurant => (
                    <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                ))
            }
        </div>
    )
}
