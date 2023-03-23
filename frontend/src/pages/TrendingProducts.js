import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAllTrendingProduct } from '../actions/productAction';
import BreadCrums from '../components/BreadCrums';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';

const TrendingProducts = () => {

    const dispatch = useDispatch();
    const { loading, products, error, productCount } = useSelector((state) => state.allTrendingProducts);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllTrendingProduct());
    }, [dispatch, error]);

    return (
        <div>
            <PageHeader pageHeader='Trending Products' />
            <BreadCrums address='Trending Products' />
            {loading ? <Loader /> :
                <div className='product'>
                    {products && products.map((product) => (<ProductCard product={product} key={product._id} />))}</div>}
        </div>
    )
}

export default TrendingProducts;