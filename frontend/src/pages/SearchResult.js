import React from 'react';
import { clearErrors, getProduct } from '../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../css/ProductCard.css';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import BreadCrums from '../components/BreadCrums';
import { toast } from 'react-toastify';


const SearchResult = () => {
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector((state) => {
        return state.products;
    });

    useEffect(() => {
        // if (!loading) {
        //     toast.success("success");
        // }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <div>
            <PageHeader pageHeader='All Products' />
            <BreadCrums address='Products' />
            {loading ? <Loader /> :
                <div className='product'>
                    {products && products.map((product) => (<ProductCard product={product} key={product._id} />))}</div>}
        </div>
    );
}

export default SearchResult;