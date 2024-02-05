import { deleteReviewThunk, oneRestaurantThunk } from "../../redux/restaurants";
import { useModal } from '../../context/Modal'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function DeleteReviewModal( {review, restaurantId} ) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const handleConfirm = async () => {
        await dispatch(deleteReviewThunk(review.id))
        closeModal()
        await dispatch(oneRestaurantThunk(restaurantId))
        navigate(`/restaurants/${restaurantId}`)
    }

    return (
        <div className="delete-modal">
            <h1 className="delete-modal-heading">Delete Review</h1>
            <h2>Are you sure you want to delete your review?</h2>
            <button onClick={handleConfirm} className="delete-modal-button confirm">Delete</button>
            <button onClick={closeModal} className="delete-modal-button go-back">Go Back</button>
        </div>
    )
}
