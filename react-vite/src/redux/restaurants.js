const ALL_RESTAURANTS = 'restaurants/ALL_RESTAURANTS'
const ONE_RESTAURANT = 'restaurants/ONE_RESTAURANT'
const REMOVE_RESTAURANT = 'restaurants/REMOVE_RESTAURANT'

const allRestaurants = (restaurants) => ({
    type: ALL_RESTAURANTS,
    payload: restaurants
})

const oneRestaurant = (restaurant) => ({
    type: ONE_RESTAURANT,
    payload: restaurant
})

const removeRestaurant = (restaurantId) => ({
    type: REMOVE_RESTAURANT,
    payload: restaurantId
})

export const allRestaurantsThunk = () => async dispatch => {
    try{
        const res = await fetch (`/api/restaurants`)
        if(res.ok) {
            const restaurants = await res.json()
            if(restaurants.errors) {
                return restaurants.errors
            }
            dispatch(allRestaurants(restaurants))
            return null
        }
    } catch(error) {
        console.log("ERROR CAUGHT IN ALL RESTAURANTS THUNK", error)
        return error
    }
}

export const oneRestaurantThunk = (restaurantId) => async dispatch => {
    try {
        const res = await fetch(`/api/restaurants/${restaurantId}`)
        if(res.ok) {
            const restaurant = await res.json()
            if(restaurant.errors) {
                return restaurant.errors
            }
            dispatch(oneRestaurant(restaurant))
            return null
        }
    } catch(error) {
        console.log("ERROR CAUGHT IN ONE RESTAURANT THUNK", error)
        return error
    }
}

export const postRestaurantThunk = (restaurant) => async dispatch => {
    try {
        const res = await fetch(`/api/restaurants/new`, {
            method: 'POST',
            body: restaurant
        })

        if (res.ok){
            const newRestaurant = await res.json()
            dispatch(oneRestaurant(newRestaurant))
            return newRestaurant

        } else {
            const err = await res.json()
            console.log(err)
            return err
        }

    } catch (error) {
        console.log("ERROR CAUGHT IN POST RESTAURANT THUNK", error)
        return error
    }
}

export const updateRestaurantThunk = (restaurant, restaurantId) => async dispatch => {
    try {
        const res = await fetch(`/api/restaurants/${restaurantId}/update`, {
            method: 'PUT',
            body: restaurant
        })

        if (res.ok){
            const newRestaurant = await res.json()
            dispatch(oneRestaurant(newRestaurant))
            return newRestaurant.id

        } else {
            const err = await res.json()
            console.log(err)
            return err
        }

    } catch (error) {
        console.log("ERROR CAUGHT IN UPDATE RESTAURANT THUNK", error)
        return error
    }
}

export const deleteRestaurantThunk = (restaurantId) => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}/delete`, {
        method: 'DELETE'
    })

    if(res.ok){
        await res.json()
        dispatch(removeRestaurant(restaurantId))
    } else {
        const error = await res.json()
        console.log("ERROR IN DELETE RESTAURANT THUNK: ", error)
        return error
    }

}

export const postItemThunk = (item, restaurantId) => async dispatch => {
    try {
        const res = await fetch(`/api/restaurants/${restaurantId}/new-item`, {
            method: 'POST',
            body: item
        })

        if(res.ok){
            const data = await res.json()
            dispatch(oneRestaurant(data))
        } else {
            const error = await res.json()
            console.log(error)
            return error
        }
    } catch (error) {
        console.log("ERROR CAUGHT IN POST ITEM THUNK", error)
        return error
    }
}

export const updateItemThunk = (item, itemId) => async dispatch => {
    try {
        const res = await fetch(`/api/items/${itemId}/update`, {
            method: 'PUT',
            body: item
        })

        if (res.ok){
            const updatedRestaurant = await res.json()
            dispatch(oneRestaurant(updatedRestaurant.id))
            return updatedRestaurant.id

        } else {
            const err = await res.json()
            console.log(err)
            return err
        }

    } catch (error) {
        console.log("ERROR CAUGHT IN UPDATE ITEM THUNK", error)
        return error
    }
}

export const deleteItemThunk = (itemId) => async dispatch => {
    const res = await fetch(`/api/items/${itemId}/delete`, {
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()
        dispatch(oneRestaurant(data))
    } else {
        const error = await res.json()
        console.log("ERROR IN DELETE ITEM THUNK: ", error)
        return error
    }
}

export const postReviewThunk = (review, restaurantId) => async dispatch => {
    try {
        const res = await fetch(`/api/restaurants/${restaurantId}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        if(res.ok){
            const data = await res.json()
            dispatch(oneRestaurant(data))
        } else {
            const error = await res.json()
            console.log(error)
            return error
        }
    } catch (error) {
        console.log("ERROR CAUGHT IN POST REVIEW THUNK", error)
        return error
    }
}

export const updateReviewThunk = (review, reviewId) => async dispatch => {
    try {
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        if(res.ok){
            const data = await res.json()
            dispatch(oneRestaurant(data))
        } else {
            const error = await res.json()
            console.log(error)
            return error
        }
    } catch (error) {
        console.log("ERROR CAUGHT IN UPDATE REVIEW THUNK", error)
        return error
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()
        dispatch(oneRestaurant(data))
    } else {
        const error = await res.json()
        console.log("ERROR IN DELETE ITEM THUNK: ", error)
        return error
    }
}

function restaurantsReducer(state = {}, action) {
    switch(action.type){
        case ALL_RESTAURANTS: {
            const newState = {}
            action.payload.forEach(restaurant => {
                newState[restaurant.id] = restaurant
            })
            return newState
        }
        case ONE_RESTAURANT: {
            return {...state, [action.payload.id]: action.payload}
        }
        case REMOVE_RESTAURANT: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}

export default restaurantsReducer
