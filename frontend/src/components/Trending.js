import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, getTrendingProduct } from '../actions/productAction';
import '../css/BlogSection.css';
import ProductCard from './ProductCard';
import Loader from './Loader';

function Trending() {

    const dispatch = useDispatch();
    const { loading, products, error, productCount } = useSelector((state) => {
        return state.trendingProducts;
    });


    useEffect(() => {
        if (error) {
            console.log(error);
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getTrendingProduct());
    }, [dispatch, error]);

    return (
        <div className='blog-section'>
            <div className="blog-header">
                <div className="hr"><hr /></div>
                <h1>Trending Products</h1>
                <div className="hr"><hr /></div>
            </div>
            <div className="blog-subheader">
                <h5>The freshest and the most exciting news</h5>
            </div>
            {loading? <Loader/> : 
            <div className="blog-content">
                {products && products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>}
            <h3><Link to='/trending-products'>See all</Link></h3>
        </div>
    )
}

export default Trending;