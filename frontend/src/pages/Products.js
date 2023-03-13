import React from 'react';
import { getProduct } from '../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../css/ProductCard.css';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import BreadCrums from '../components/BreadCrums';
import { toast } from 'react-toastify';


const Products = () => {
    const dispatch = useDispatch();
    const {loading, error, products, productCount } = useSelector((state)=>{
        return state.products;
    });
    
    useEffect(()=>{
        if (error){
            return toast.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error]);
    
    return (
    <div>
        <PageHeader pageHeader='All Products'/>
        <BreadCrums address='Products'/>
        {loading? <Loader/>: <div className='product'>
        {products && products.map((product)=>(<ProductCard product={product} key={product.name}/>))}</div>}
    </div>
  );
}

export default Products;