import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getProductDetails } from '../actions/productAction';
import Loader from './Loader';

const ReviewForm = ({ productName, productId }) => {

    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const { reviewLoading } = useSelector((state) => state.productDetails);
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleHover = (id) => {
        setHoveredStar(id);
    };

    const handleClick = (id) => {
        setRating(id);
    };

    const handleMouseLeave = () => {
        setHoveredStar(0);
    };

    const submitHandle = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.warning('Login to create a review');
            return;
        }

        if (!rating) {
            toast.warning('Select star rating first');
            return;
        }

        if (comment.trim() === "") {
            toast.warning("Review can't be empty");
            return;
        }

        const data = {
            rating, productId, comment
        }

        try {
            const response = await dispatch(createReview(data));
            dispatch(getProductDetails(productId));
            
            if (response.success) {
                toast.success('Review created!');   
                setComment('');
                setRating(0);
            }
            else {
                toast.error('Some error occured!');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const stars = Array.from({ length: 5 }, (_, index) => {
        const starId = index + 1;
        let color = 'gray';
        let fill = 'gray';
        if (starId <= (Math.max(hoveredStar, rating))) {
            color = '#ff5501';
            fill = '#ff5501';
        }
        return (
            <span
                key={starId}
                className='star'
                style={{ color }}
                onMouseOver={() => handleHover(starId)}
                onClick={() => handleClick(starId)}
                onMouseLeave={handleMouseLeave}
            >
                <svg stroke={color} fill={fill} strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><g id="Star"><path d="M16.6,20.463a1.5,1.5,0,0,1-.7-.174l-3.666-1.927a.5.5,0,0,0-.464,0L8.1,20.289a1.5,1.5,0,0,1-2.177-1.581l.7-4.082a.5.5,0,0,0-.143-.442L3.516,11.293a1.5,1.5,0,0,1,.832-2.559l4.1-.6a.5.5,0,0,0,.376-.273l1.833-3.714a1.5,1.5,0,0,1,2.69,0l1.833,3.714a.5.5,0,0,0,.376.274l4.1.6a1.5,1.5,0,0,1,.832,2.559l-2.965,2.891a.5.5,0,0,0-.144.442l.7,4.082A1.5,1.5,0,0,1,16.6,20.463Zm-3.9-2.986L16.364,19.4a.5.5,0,0,0,.725-.527l-.7-4.082a1.5,1.5,0,0,1,.432-1.328l2.965-2.89a.5.5,0,0,0-.277-.853l-4.1-.6a1.5,1.5,0,0,1-1.13-.821L12.449,4.594a.516.516,0,0,0-.9,0L9.719,8.308a1.5,1.5,0,0,1-1.13.82l-4.1.6a.5.5,0,0,0-.277.853L7.18,13.468A1.5,1.5,0,0,1,7.611,14.8l-.7,4.082a.5.5,0,0,0,.726.527L11.3,17.477a1.5,1.5,0,0,1,1.4,0Z"></path></g></svg>
            </span>
        );
    });

    return (
        reviewLoading ? <Loader/> : 
        <div className='review-form-container'>
            <h1>Write Your Own Review</h1>
            <div className="review-form-name">
                Your are reviewing: <span className="review-product-name">{productName}</span>
            </div>
            <form action="" className='review-form' onSubmit={submitHandle}>
                <div className="review-1">
                    <div className="review-rating">
                        <label htmlFor="rating">
                            Rating
                            <span className='required'>*</span>
                        </label>
                        <input type="number" hidden value={rating} name='rating' readOnly={true} />
                        <div className="rating-stars">
                            {stars}
                        </div>
                    </div>
                </div>
                <div className="review-2 input-field">
                    <label htmlFor="comment">
                        Review
                        <span className='required'>*</span>
                    </label>
                    <textarea id='comment' aria-required='true' value={comment} onChange={(e) => setComment(e.target.value)} name='comment' required/>
                </div>
                <button type="submit review-submit" disabled={reviewLoading}>Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewForm;