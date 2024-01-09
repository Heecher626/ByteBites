import { deleteItemThunk, oneRestaurantThunk } from "../../redux/restaurants";
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ItemModal from "./ItemModal";


export default function DeleteItemModal( {item} ) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal, setModalContent } = useModal()
    const back = () => {
        setModalContent(<ItemModal item={item} isOwner={true} />)
    }

    const handleConfirm = async () => {
        await dispatch(deleteItemThunk(item.id))
        closeModal()
        await dispatch(oneRestaurantThunk(item.restaurant_id))
        navigate(`/restaurants/${item.restaurant_id}`)
    }

    return (
        <div className="delete-modal">
            <h1 className="delete-modal-heading">Delete Item</h1>
            <h2>Are you sure you want to delete this item?</h2>
            <button onClick={handleConfirm} className="delete-modal-button confirm">Delete</button>
            <button onClick={back} className="delete-modal-button go-back">Go Back</button>
        </div>
    )
}
