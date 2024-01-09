import {useDispatch, useSelector} from "react-redux"
import { allRestaurantsThunk } from "../../redux/restaurants"
import { useEffect, useState } from "react"
import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";

import "./AllRestaurantsPage.css"

export default function AllRestaurantsPage({myRestaurants}) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const allRestaurants = useSelector(state => Object.values(state.restaurants))
    const user = useSelector(state => state.session.user)
    const [ownerView, setOwnerView] = useState(myRestaurants)

    useEffect(() => {
        const getRestaurants = async () => {
            await dispatch(allRestaurantsThunk())
        }

        getRestaurants()
    }, [dispatch])

    let restaurants = allRestaurants
    if(ownerView){
        restaurants = allRestaurants.filter((restaurant) => restaurant.owner_id == user.id)
    }
    console.log(restaurants.length)
    console.log(ownerView)
    return(
        <div className="all-restaurants-page">
            <h1 className="all-restaurants-heading">{ownerView ? 'Your Restaurants' : 'Restaurants on ByteBites'}</h1>
            { user && (
                ownerView ?
                <div className="all-restaurants-owner-toggle-container">
                    <span onClick={() => setOwnerView(false)} className="all-restaurants-toggle toggle-active">All Restaurants</span>
                    <span className="all-restaurants-toggle toggle-inactive">My Restaurants</span>
                </div>
                :
                <div className="all-restaurants-owner-toggle-container">
                    <span className="all-restaurants-toggle toggle-inactive">All Restaurants</span>
                    <span onClick={() => setOwnerView(true)} className="all-restaurants-toggle toggle-active">My Restaurants</span>
                </div>
            )

            }
            <div className="all-restaurants-card-container">
                {
                    restaurants.map(restaurant => (
                        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                    ))
                }

            </div>
            {

                ownerView && restaurants.length == 0 && (
                    <div className="no-restaurants">
                        You don't have any restaurants yet!
                    </div>
                )
            }
           { ownerView && <button onClick={() => navigate(`/restaurants/new`)}>Create Restaurant</button>}
        </div>
    )
}
