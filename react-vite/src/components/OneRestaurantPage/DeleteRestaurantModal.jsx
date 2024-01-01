import { deleteRestaurantThunk } from "../../redux/restaurants";
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function DeleteRestaurantModal( {restaurantId} ) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const handleConfirm = async () => {
        await dispatch(deleteRestaurantThunk(restaurantId))
        closeModal()
        navigate('/restaurants')
    }

    return (
        <div>
            <h1>Are you sure you want to delete this restaurant?</h1>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}
