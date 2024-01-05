import OpenModalButton from "../OpenModalButton"
import DeleteItemModal from "./DeleteItemModal"
import { useNavigate } from "react-router-dom"
import "./ItemModal.css"

export default function ItemModal({item, isOwner}) {
    const navigate = useNavigate()
    return (
        <div className="item-modal">
            <h1>{item.name}</h1>
            <img className="item-modal-image" src={item.image_url}/>
            <div className="item-modal-description">{item.description}</div>

            <div>
                <button disabled>Add to cart (coming soon)</button>
            </div>
                { isOwner ? (
                        <div className="item-modal-owner-buttons">
                            <OpenModalButton modalComponent={<DeleteItemModal item={item} />} buttonText={"Delete Item"} />
                            <button onClick={() => navigate(`/restaurants/${item.restaurant_id}/items/${item.id}/update`)}>Update Item</button>
                        </div>
                    ) : null}




        </div>
    )
}
