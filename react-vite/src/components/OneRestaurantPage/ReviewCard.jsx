import { IoIosStar } from "react-icons/io";
import { useSelector } from "react-redux/es/hooks/useSelector";
import OpenModalButton from "../OpenModalButton";

import './ReviewCard.css'
import ReviewModal from "./ReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

export default function ReviewCard({review, restaurant}){
    const user = useSelector((state) => state.session.user)

    return (
        <div className="review-card">
            <div className="review-card-name">{review.reviewer}</div>
            <div className="review-card-stars">
                { review.stars >= 1 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { review.stars >= 2 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { review.stars >= 3 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { review.stars >= 4 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
                { review.stars >= 5 ? <IoIosStar className="review-card-star"/> : <IoIosStar className="review-card-star-empty"/> }
            </div>
            <div className="review-card-content">{review.content}</div>

            {
                user.username === review.reviewer ?
                <div>
                    <OpenModalButton modalComponent={<ReviewModal review={review} restaurant={restaurant}/>} buttonText={`Update Review1`} className={''}/>
                    <OpenModalButton modalComponent={<DeleteReviewModal review={review} restaurantId={restaurant.id}/>} buttonText={'Delete Review'} />
                </div>
                : null
            }

        </div>
    )
}
