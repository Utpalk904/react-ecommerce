import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import '../css/ProductCard.css';

const ProductCard = ({product}) => {
    const options = {
        edit : false,
        color : "rgba(20,20,20,.1)",
        activeColor : "tomato",
        size : 16,
        value : product.rating,
        isHalf : true
    }
  return (
    <Link className='product-card' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p className='product-name'>{product.name}</p>
        <div className='product-rating'>
            <ReactStars {...options}/>
            <div className='product-review'>{'( '+ product.numOfReviews + ' Reviews )'}</div>
        </div>
        <span className='product-price'>{'₹'+product.price}</span>
    </Link>
  )
}

export default ProductCard;