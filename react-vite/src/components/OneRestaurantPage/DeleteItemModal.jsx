import { deleteItemThunk, oneRestaurantThunk } from "../../redux/restaurants";
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function DeleteItemModal( {item} ) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const handleConfirm = async () => {
        await dispatch(deleteItemThunk(item.id))
        closeModal()
        await dispatch(oneRestaurantThunk(item.restaurant_id))
        navigate(`/restaurants/${item.restaurant_id}`)
    }

    return (
        <div>
            <h1>Are you sure you want to delete this item?</h1>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}
