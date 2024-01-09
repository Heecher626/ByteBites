import { deleteRestaurantThunk } from "../../redux/restaurants";
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../DeleteModal.css"


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
        <div className="delete-modal">
            <h1 className="delete-modal-heading">Delete Restaurant</h1>
            <h2 className="delete-modal-message">Are you sure you want to delete this restaurant?</h2>
            <button onClick={handleConfirm} className="delete-modal-button confirm">Delete</button>
            <button onClick={closeModal} className="delete-modal-button go-back">Go Back</button>
        </div>
    )
}
