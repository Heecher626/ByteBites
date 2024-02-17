import { oneRestaurantThunk, postReviewThunk, updateReviewThunk } from "../../redux/restaurants";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import './ReviewModal.css'
import { useNavigate } from "react-router-dom";


export default function ReviewModal( {restaurant, review}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()
    const [stars, setStars] = useState(review ? review.stars : 0)
    const [activeStars, setActiveStars] = useState()
    const [content, setContent] = useState(review ? review.content : "")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        setActiveStars(stars)

    }, [stars])

    useEffect(() => {
        const errors = {}

        if (stars === 0){
            errors.stars = 'Please add a star rating'
        }

        if (content.length < 10){
            errors.content = 'Review must be at least 10 characters'
        }

        setValidationErrors(errors)
    }, [stars, content])

    const mouseEnter = (num) => {
        setActiveStars(num)
    }

    const mouseLeave = () => {
        setActiveStars(stars)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if (Object.values(validationErrors).length){
            return;
        }

        const newReview = {
            stars,
            content
        }

        if(!review){
            await dispatch(postReviewThunk(newReview, restaurant.id))
        }

        else {
            await dispatch(updateReviewThunk(newReview, review.id))
        }

        closeModal()
        await dispatch(oneRestaurantThunk(restaurant.id))
        navigate(`/restaurants/${restaurant.id}`)

    }


    return (
        <div className="review-modal">
            <h1>{ !review ? `Rate & Review ${restaurant.name}` : `Update your review for ${restaurant.name}`}</h1>


            <div>Rate your overall experience</div>
            <div className="review-form-stars-container">
                <div
                onClick={() => setStars(1)}
                onMouseEnter={() => mouseEnter(1)}
                onMouseLeave={mouseLeave}>
                { activeStars >= 1 ? <IoIosStar className="review-star"/> : <IoIosStarOutline className="review-star"/> }
                </div>

                <div
                onClick={() => setStars(2)}
                onMouseEnter={() => mouseEnter(2)}
                onMouseLeave={mouseLeave}>
                { activeStars >= 2 ? <IoIosStar className="review-star"/> : <IoIosStarOutline className="review-star"/> }
                </div>

                <div
                onClick={() => setStars(3)}
                onMouseEnter={() => mouseEnter(3)}
                onMouseLeave={mouseLeave}>
                { activeStars >= 3 ? <IoIosStar className="review-star"/> : <IoIosStarOutline className="review-star"/> }
                </div>

                <div
                onClick={() => setStars(4)}
                onMouseEnter={() => mouseEnter(4)}
                onMouseLeave={mouseLeave}>
                { activeStars >= 4 ? <IoIosStar className="review-star"/> : <IoIosStarOutline className="review-star"/> }
                </div>

                <div
                onClick={() => setStars(5)}
                onMouseEnter={() => mouseEnter(5)}
                onMouseLeave={mouseLeave}>
                { activeStars >= 5 ? <IoIosStar className="review-star"/> : <IoIosStarOutline className="review-star"/> }
                </div>
            </div>
            <div className="error">{hasSubmitted && validationErrors.stars}</div>

            <label className="form-input">
                <div>Write a review</div>
                <textarea
                type="text"
                value={content}
                maxLength={300}
                className={`form-text-input ${hasSubmitted && validationErrors.content ? "error-border" : ""}`}
                onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <div className="error">{hasSubmitted && validationErrors.content}</div>

            <button className="review-submit-button" onClick={handleSubmit}>Post Review</button>
        </div>
    )

}
