import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const SearchResultCard = ({product, clickfx}) => {
  return (
    <Link className='search-result-card' to={`/product/${product._id}`} onClick={clickfx}>
        <div className="result-image">
            <img src={product.images[0].url} alt={product._id} />
        </div>
        <div className="result-info">
            <span className="result-name">
                {product.name}
            </span>
            <span className="result-price">
                {'₹'+product.price}
            </span>
        </div>
    </Link>
  )
}

export default SearchResultCard;