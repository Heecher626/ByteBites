import { oneRestaurantThunk, updateRestaurantThunk } from "../../redux/restaurants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";


export default function UpdateRestaurantForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { restaurantId } = useParams()
    const restaurant = useSelector(state => state.restaurants[restaurantId])
    const [name, setName] = useState(restaurant?.name)
    const [description, setDescription] = useState(restaurant?.description)
    const [preview, setPreview] = useState("")
    const [banner, setBanner] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    useEffect( () =>  {
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

        if (description?.length < 10){
            errors.description = 'Description is required, and must be at least 10 characters'
        }

        setValidationErrors(errors)
    }, [name, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("preview_image_url", preview)
        formData.append("banner_image_url", banner)

        setImageLoading(true);
        let restaurant = await dispatch(updateRestaurantThunk(formData, restaurantId))

        setHasSubmitted(false)
        navigate(`/restaurants/${restaurant}`)
    }

    return (
        <div className="form-container">
            <div className="form-content">

                <h1 className="form-header">{`Let's update ${restaurant?.name}!`}</h1>

                <form
                className="form-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data">

                    <label className="form-input">
                        <span>What should we name your restaurant?</span>
                        <input
                        type="text"
                        value={name}
                        placeholder="Restaurant Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-text-input"
                        />
                        {hasSubmitted && validationErrors.name && (
                            <span className="error">{validationErrors.name}</span>
                        )}
                    </label>

                    <label className="form-input">
                        <span>How would you describe your restaurant?</span>
                        <textarea
                        type="text"
                        value={description}
                        placeholder="Restaurant Description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                        required
                        />
                        {hasSubmitted && validationErrors.description && (
                            <span className="error">{validationErrors.description}</span>
                        )}
                    </label>

                    <label className="form-input">
                        <span>Upload a preview image for your restaurant (A square resolution looks best!)</span>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPreview(e.target.files[0])}
                        />
                        {hasSubmitted && validationErrors.preview && (
                            <span className="error">{validationErrors.preview}</span>
                        )}
                    </label>

                    <label className="form-input">
                        <span>Upload a banner image for your restaurant (A wide rectangle resolution looks best!)</span>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBanner(e.target.files[0])}
                        />
                        {hasSubmitted && validationErrors.banner && (
                            <span className="error">{validationErrors.banner}</span>
                        )}

                    </label>

                    <button className="form-submit-button" type="submit">All Ready!</button>
                    {(imageLoading) && <p>Please wait while our servers handle your request!</p>}
                </form>
            </div>
        </div>
    )
}
