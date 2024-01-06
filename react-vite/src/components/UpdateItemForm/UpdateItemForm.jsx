import { useDispatch, useSelector } from "react-redux";
import { updateItemThunk, oneRestaurantThunk } from "../../redux/restaurants";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateItemForm() {
    const dispatch = useDispatch();
    const { restaurantId, itemId } = useParams()
    const restaurant = useSelector(state => state.restaurants[restaurantId])
    const navigate = useNavigate();

    const item = restaurant?.items[itemId]

    const [name, setName] = useState(item?.name)
    const [description, setDescription] = useState(item?.description)
    const [image, setImage] = useState("")
    let price_dollars = item ? Number(item.price_cents) / 100 : 12
    const [price, setPrice] = useState(price_dollars)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)


    useEffect(() => {
        const getRestaurant = async () => {
            await dispatch(oneRestaurantThunk(restaurantId))
        }

        getRestaurant()
    }, [dispatch, restaurantId])


    useEffect(() => {
        const errors = {}

        if (name?.length < 3) {
            errors.name = 'A name is required, and must be at least 3 characters'
        }

        if (price <= 0) {
            errors.image = 'Price must be at least one cent!'
        }

        setValidationErrors(errors)
    }, [name, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price_cents", price*100)
        formData.append("image", image)

        setImageLoading(true);
        await dispatch(updateItemThunk(formData, itemId))

        setHasSubmitted(false)
        navigate(`/restaurants/${restaurantId}`)
    }

    return (
        <div className="form-container">
            <div className="form-content">
                <h1 className="form-header">Update {item?.name}</h1>
                <form className="form-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data">

                    <label className="form-input">
                        <div>What is the name of this item?</div>
                        <input
                        type="text"
                        value={name}
                        placeholder="Item Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                        {hasSubmitted && validationErrors.name && (
                            <div className="error">{validationErrors.name}</div>
                        )}
                    </label>

                    <label className="form-input">
                        <div>What is the price for this item?</div>
                        <input
                        type="number"
                        value={price}
                        placeholder="Item Price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        />
                        {hasSubmitted && validationErrors.price && (
                            <div className="error">{validationErrors.price}</div>
                        )}
                    </label>

                    <label className="form-input">
                        <div>How would you describe your item?</div>
                        <textarea
                        type="text"
                        value={description}
                        placeholder="Item Description"
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <label className="form-input">
                        <div>Upload an image for this item</div>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        />
                        {hasSubmitted && validationErrors.image && (
                            <div className="error">{validationErrors.image}</div>
                        )}
                    </label>

                    <button className="form-submit-button">All Ready!</button>

                    {(imageLoading) && <p>Please wait while our servers handle your request!</p>}

                </form>
            </div>
        </div>
    )
}
