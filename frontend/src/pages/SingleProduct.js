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
import ProductReviews from '../components/ProductReviews';
import { addToCart } from '../actions/cartAction';
import Loader2 from '../components/Loader2';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    const { cart, cartLoading, cartError } = useSelector((state) => state.cart);

    const { isAuthenticated } = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);

    const [currentCartItem, setCurrentCartItem] = useState(null);

    useEffect(() => {
        if (cart.length > 0) {
            const current = cart.filter((item) => item.productId === id);
            if (current.length > 0) {
                setCurrentCartItem(current[0]);
            }
        }
    }, [cart, id])

    const [validQuantity, setValidQuantity] = useState({});

    useEffect(() => {
        if (product && product.stock) {
            setValidQuantity({ valid: true, q: product.stock, message: "" });
        }
    }, [product])

    useEffect(() => {
        if (cart.length === 0) {
            setValidQuantity({ valid: true, q: product.stock, message: "" });
            return;
        }

        if (currentCartItem) {
            if (currentCartItem.quantity > product.stock) {
                const q = currentCartItem.quantity - product.stock;
                setValidQuantity({ valid: false, q: 0, message: `Remove ${q} quantity (quantity exceeded)` });
            }

            else if (currentCartItem.quantity === product.stock) {
                setValidQuantity({ valid: false, q: 0, message: `available stock is already in cart` });
            }

            else if ((currentCartItem.quantity + quantity) === product.stock) {
                setValidQuantity({ valid: true, q: quantity, message: "" });
            }

            else if ((currentCartItem.quantity + quantity) > product.stock) {
                const q = product.stock - currentCartItem.quantity;
                setValidQuantity({ valid: false, q: 0, message: `Reduce the quantity to ${q} or less` });
            }
            else {
                const q = product.stock - currentCartItem.quantity;
                setValidQuantity({ valid: true, q: q, message: "" });
            }
        }
    }, [currentCartItem, product, cart, quantity]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,.1)",
        activeColor: "tomato",
        size: 16,
        value: product.ratings,
        isHalf: true
    }

    const minusHandler = () => {
        if (cartLoading) {
            return;
        }
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const plusHandler = () => {
        if (cartLoading) {
            return;
        }
        if (validQuantity && (quantity < validQuantity.q)) {
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

    const addToCartHandler = async () => {
        if (!isAuthenticated) {
            toast.warning("Login to use cart");
            return;
        }
        if (cartLoading || !validQuantity.valid) {
            return;
        }
        const cartData = {
            id: id,
            q: quantity
        }

        await dispatch(addToCart(cartData));
        if (!cartError) {
            toast.success("added to cart");
        }
    }

    return (
        <div className='single-product relative'>
            {cartLoading && <Loader2 />}
            <MetaData title={product.name} />
            <PageHeader pageHeader={product.name} />
            <BreadCrums isProduct='true' address='Product' address2={product.name} />
            {(loading) ? <Loader /> :
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
                            {validQuantity && <button className='login-reg-button register add-cart-button disabled:bg-[#91e5f2] disabled:hover:bg-[#91e5f2] disabled:cursor-not-allowed' onClick={addToCartHandler} disabled={loading || cartLoading || !validQuantity.valid}>ADD TO CART</button>}
                        </div>
                        {!validQuantity.valid && <div className='text-red-500 text-sm mb-2'>***{validQuantity.message}</div>}
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
                            <ReviewForm productName={product.name} productId={product && product._id} />
                            {product && product.numOfReviews && product.numOfReviews !== 0 ?
                                <div className='flex flex-wrap gap-5 mt-12'>
                                    {product && product.reviews && product.reviews.length !== 0 && product.reviews.map((review, index) => (
                                        <ProductReviews key={index} review={review} />
                                    ))}
                                </div>
                                : null}
                        </div>
                    </div>
                    <div className="accordion-data">
                        <div className={detail}>
                            {details}
                        </div>
                        <div className={review}>
                            <ReviewForm productName={product.name} productId={product && product._id} />
                            {product && product.numOfReviews && product.numOfReviews !== 0 ?
                                <div className='flex flex-wrap gap-5 mt-12'>
                                    {product && product.reviews && product.reviews.length !== 0 && product.reviews.map((review, index) => (
                                        <ProductReviews key={index} review={review} />
                                    ))}
                                </div>
                                : null}
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