export default function RestaurantCard({restaurant}) {

    return(
        <div>
            <div>{restaurant.name}</div>
            <img src={restaurant.preview_image_url}/>
        </div>
    )
}
