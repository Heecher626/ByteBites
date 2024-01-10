import { postRestaurantThunk } from "../../redux/restaurants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../form.css"

export default function CreateRestaurantForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [preview, setPreview] = useState("")
    const [banner, setBanner] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        const errors = {}

        if (name.length < 3) {
            errors.name = 'A name is required, and must be at least 3 characters'
        }

        if (description.length < 10){
            errors.description = 'Description is required, and must be at least 10 characters'
        }

        if (!preview || preview.length < 1) {
            errors.preview = 'A preview image is required'
        }

        if (!banner || banner.length < 1) {
            errors.banner = 'A banner image is required'
        }

        setValidationErrors(errors)
    }, [name, description, preview, banner])

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
        let restaurant = await dispatch(postRestaurantThunk(formData))

        setHasSubmitted(false)
        navigate(`/restaurants/${restaurant.id}`)
    }

    return (
        <div className="form-container">
            <div className="form-content">
                <h1 className="form-header">{"Let's make a new restaurant!"}</h1>
                <form
                className="form-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data">

                    <label className={"form-input"}>
                        <div>What should we name your restaurant?</div>
                        <input
                        type="text"
                        value={name}
                        placeholder="Restaurant Name"
                        maxLength={50}
                        onChange={(e) => setName(e.target.value)}
                        className={`form-text-input ${hasSubmitted && validationErrors.name ? "error-border" : ""}`}
                        required
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.name}</div>

                    <label className="form-input">
                        <div>How would you describe your restaurant?</div>
                        <textarea
                        type="text"
                        value={description}
                        maxLength={500}
                        placeholder="Restaurant Description"
                        onChange={(e) => setDescription(e.target.value)}
                        className={`form-textarea ${hasSubmitted && validationErrors.description ? "error-border" : ""}`}
                        required
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.description}</div>

                    <label className="form-input">
                        <div>Upload a preview image for your restaurant (A square resolution looks best!)</div>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPreview(e.target.files[0])}
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.preview}</div>

                    <label className="form-input">
                        <div>Upload a banner image for your restaurant (A wide rectangle resolution looks best!)</div>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBanner(e.target.files[0])}
                        />
                    </label>
                    <div className="error">{hasSubmitted && validationErrors.banner}</div>

                    <button className="form-submit-button" type="submit">All Ready!</button>
                    {(imageLoading) && <p>Please wait while our servers handle your request!</p>}
                </form>
            </div>
        </div>
    )
}
