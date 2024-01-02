import { useNavigate } from "react-router-dom"

export default function MyRestaurantsPage(){
    const navigate = useNavigate()

    return(
        <button onClick={(e) => navigate(`/restaurants/new`)}>Create Restaurant</button>
    )
}
