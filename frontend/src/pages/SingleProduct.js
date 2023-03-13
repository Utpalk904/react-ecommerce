import React, { useEffect } from 'react';
import BreadCrums from '../components/BreadCrums';
import PageHeader from '../components/PageHeader';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../actions/productAction';
import { useParams } from 'react-router-dom';
 
const SingleProduct = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state)=>
        state.productDetails);
    useEffect(()=>{
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

  return (
    <div className='single-product'>
        <PageHeader pageHeader='Single' />
        <BreadCrums isProduct='true' address='Product' address2='Single'/>
        <div className="product-detail">
            <Carousel>
                {product.images && product.images.map((item, i)=>(
                    <img className='carousel-image' key={item.url} src={item.url} alt={`${i} slide`} />
                ))}
            </Carousel>
        </div>
    </div>
  )
}

export default SingleProduct;