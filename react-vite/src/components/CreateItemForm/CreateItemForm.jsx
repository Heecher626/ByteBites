import { useDispatch, useSelector } from "react-redux";
import { postItemThunk, oneRestaurantThunk } from "../../redux/restaurants";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function CreateItemForm() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams()
    const restaurant = useSelector(state => state.restaurants[restaurantId])
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)

    useEffect( () =>  {
        const getRestaurant = async () => {
            await dispatch(oneRestaurantThunk(restaurantId))
        }

        getRestaurant()
    }, [dispatch, restaurantId])

    function formatPrice(value) {
        let periodIndex = value.indexOf('.')
        let decimal = value.slice(periodIndex)

        if(decimal.length > 3) value = parseFloat(value).toFixed(2)
        return value
    }

    useEffect(() => {
        const errors = {}

        if (name.length < 3) {
            errors.name = 'A name is required, and must be at least 3 characters'
        }

        if (price <= 0) {
            errors.price = 'Price must be at least one cent!'
        }

        if (price >= 10000) {
            errors.price = 'Price cannot exceed $10000'
        }

        setValidationErrors(errors)
    }, [name, price])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", image)
        formData.append("price_cents", price*100)
        formData.append("description", description)

        setImageLoading(true)
        await dispatch(postItemThunk(formData, restaurantId))
        setHasSubmitted(false)
        navigate(`/restaurants/${restaurantId}`)
    }


    return (
        <div className="form-container">
            <div className="form-content">

                <h1 className="form-header">Create a new item for {restaurant?.name}</h1>

                <form className="form-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data">

                    <label className="form-input">
                        <div>What is the name of this item?</div>
                        <input
                        type="text"
                        value={name}
                        placeholder="Item Name"
                        maxLength={50}
                        onChange={(e) => setName(e.target.value)}
                        className={`form-text-input ${hasSubmitted && validationErrors.name ? "error-border" : ""}`}
                        required
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.name}</div>

                    <label className="form-input">
                        <div>What is the price for this item?</div>
                        <i className="fa-solid fa-dollar-sign form-icon"></i>
                        <input
                        type="number"
                        value={price}
                        placeholder="Item Price"
                        onChange={(e) => setPrice(formatPrice(e.target.value))}
                        className={`form-price ${hasSubmitted && validationErrors.price ? "error-border" : ""}`}
                        step={0.01}
                        required
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.price}</div>

                    <label className="form-input">
                        <div>How would you describe your item?</div>
                        <textarea
                        type="text"
                        value={description}
                        placeholder="Item Description"
                        maxLength={150}
                        className="form-textarea"
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <div className="error">{ hasSubmitted && validationErrors.description}</div>

                    <label className="form-input">
                        <div>Upload an image for this item</div>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.image}</div>

                    <button className="form-submit-button">All Ready!</button>
                    {(imageLoading) && <p>Please wait while our servers handle your request!</p>}

                </form>
            </div>
        </div>
    )
}
