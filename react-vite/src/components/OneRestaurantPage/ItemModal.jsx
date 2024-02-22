import OpenModalButton from "../OpenModalButton"
import DeleteItemModal from "./DeleteItemModal"
import { useNavigate } from "react-router-dom"
import "./ItemModal.css"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { thunkAddToCart } from "../../redux/session"

export default function ItemModal({item, isOwner}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const navigate = useNavigate()
    let string_price = item.price_cents.toString()

    const navigateUpdate = () => {
        navigate(`/restaurants/${item.restaurant_id}/items/${item.id}/update`)
        closeModal()
    }

    const addToCart = async () => {
        await dispatch(thunkAddToCart(item.id))
    }

    string_price = `${string_price.slice(0, string_price.length-2)}.${string_price.slice(string_price.length-2)}`
    return (
        <div className="item-modal">
            <h1>{item.name}</h1>
            {item.image_url && <img className="item-modal-image" src={item.image_url}/>}
            <div className="item-modal-description">{item.description}</div>

            <div>
                <button className="item-modal-button" onClick={addToCart}>Add to cart: ${string_price} (coming soon)</button>
            </div>
                { isOwner ? (
                        <div className="item-modal-owner-buttons">
                            <button className="item-modal-button" onClick={navigateUpdate}>Update Item</button>
                            <OpenModalButton modalComponent={<DeleteItemModal item={item} />} buttonText={"Delete Item"} className="item-modal-button" id="item-modal-delete"/>
                        </div>
                    ) : null}

        </div>
    )
}
