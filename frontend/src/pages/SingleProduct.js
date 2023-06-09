import React, { useEffect, useState } from 'react';
import BreadCrums from '../components/BreadCrums';
import PageHeader from '../components/PageHeader';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { IoIosHeartEmpty } from 'react-icons/io';
import '../css/SingleProduct.css';
import MetaData from '../components/MetaData';
import DeliveryCard from '../components/DeliveryCard';
import { details, deliveryCard } from '../constants/productData';
import ReviewForm from '../components/ReviewForm';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) =>
        state.productDetails);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,.1)",
        activeColor: "tomato",
        size: 16,
        value: product.rating,
        isHalf: true
    }

    const [quantity, setQuantity] = useState(1);

    const minusHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const plusHandler = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    }

    const [detail, setDetail] = useState('hidden');
    const [review, setReview] = useState('hidden');

    const accordionDetailClick = () => {
        if (detail === 'hidden') {
            setDetail('active');
            setReview('hidden');
        }
        else {
            setDetail('hidden');
        }
    }

    const accordionReviewClick = () => {
        if (review === 'hidden') {
            setDetail('hidden');
            setReview('active');
        }
        else {
            setReview('hidden');
        }
    }

    return (
        <div className='single-product'>
            <MetaData title={product.name} />
            <PageHeader pageHeader={product.name} />
            <BreadCrums isProduct='true' address='Product' address2={product.name} />
            {(loading)?<Loader/>:
            <div className="single-product-card">
                <Carousel className='single-product-image'
                    autoPlay={true} interval={3000} infiniteLoop={true} emulateTouch={true} showStatus={false} showThumbs={false}>
                    {product.images && product.images.map((item, i) => (
                        <img className='carousel-image' key={item.url} src={item.url} alt={`${i} slide`} />
                    ))}
                </Carousel>
                <div className="single-product-detail">
                    <div className="single-product-name-wishlist">
                        <span className="single-product-name">
                            {product.name}
                        </span>
                        <span className="single-product-wishlist">
                            <IoIosHeartEmpty />
                        </span>
                    </div>
                    <div className="single-product-reviews">
                        {(product.numOfReviews !== 0) ?
                            <div className='product-rating'>
                                <ReactStars {...options} />
                                <div className='product-review'>{'( ' + product.numOfReviews + ' Reviews )'}</div>
                            </div>
                            :
                            <div className="zero-product-review">
                                <a href="#review" onClick={accordionReviewClick}>Be the first to review this product</a>
                            </div>
                        }
                    </div>
                    <div className="single-product-price">
                        {`₹ ${product.price}`}
                    </div>
                    <div className="single-product-description">
                        {product.description}
                    </div>
                    <div className="single-product-function">
                        <span className="single-product-quantity">
                            <span className="minus" onClick={minusHandler}>-</span>
                            <span className="single-product-quantity-value">{quantity}</span>
                            <span className="plus" onClick={plusHandler}>+</span>
                        </span>
                        <button className='login-reg-button register add-cart-button'>ADD TO CART</button>
                    </div>
                    <div className="single-product-size-delivery">
                        <span className="size-chart">Size Guide</span>
                        <span className="delivery">Delivery & Return</span>
                    </div>
                    <div className="single-product-category">
                        <span className="category-text">Category: </span>
                        <span className="category-value">{product.category}</span>
                    </div>
                    <div className="single-product-available">
                        <span className="avail">Availability: </span>
                        {(product.stock > 0) ? <span className="in-stock">In Stock</span>
                            :
                            <span className="out-stock">Out of Stock</span>}
                    </div>
                    {(product.stock > 0) ?
                        <div className='single-product-stock'>
                            <span className="stock-only">Only </span>
                            <span className="stock-value">{product.stock}</span>
                            <span className="stock-only"> left</span>
                        </div>
                        :
                        ""}
                </div>
            </div>}
            <div className="single-product-more-info">
                <div className='accordion'>
                    <div className="accordion-tabs">
                        <button onClick={accordionDetailClick} className={(detail === 'active') ? 'active-btn' : ''}>
                            <span className="tabname">
                                Details
                            </span>
                            <span className='accordion-icon'>
                                {(detail === 'hidden') ? '+' : '-'}
                            </span>
                        </button>
                        <div className={detail + ' accordion-data-mobile'}>
                            {details}
                        </div>
                        <button onClick={accordionReviewClick} id='review' className={(review === 'active') ? 'active-btn' : ''}>
                            <span className="tabname">
                                Reviews
                            </span>
                            <span className='accordion-icon'>
                                {(review === 'hidden') ? '+' : '-'}
                            </span>
                        </button>
                        <div className={review + ' accordion-data-mobile'}>
                            <ReviewForm productName={product.name} />
                        </div>
                    </div>
                    <div className="accordion-data">
                        <div className={detail}>
                            {details}
                        </div>
                        <div className={review}>
                            <ReviewForm productName={product.name} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-product-extra">
                <div className="blog-header">
                    <div className="hr"><hr /></div>
                    <h1 className='extra-header'>DELIVERY & RETURNS</h1>
                    <div className="hr"><hr /></div>
                </div>
                <div className="single-product-constant">
                    {deliveryCard.map((item) => (
                        <DeliveryCard key={item.heading} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;