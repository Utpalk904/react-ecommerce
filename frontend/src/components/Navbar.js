import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearErrors, getProduct } from '../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import '../css/Navbar.css';

import { GrFacebookOption } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";
import { GrGooglePlus } from "react-icons/gr";
import { GrInstagram } from "react-icons/gr";

import { BiMenuAltLeft } from 'react-icons/bi';

import { IoIosSearch } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoHeartOutline } from 'react-icons/io5';

import { VscAccount } from 'react-icons/vsc';
import { BsCart3 } from 'react-icons/bs';

import { CgClose } from 'react-icons/cg';

import { IoHomeOutline } from 'react-icons/io5';

import { IoSettingsOutline } from 'react-icons/io5';
import SearchResultCard from './SearchResultCard';


const Navbar = () => {

    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => {
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

    const searchClick = () => {
        setModalClass('search-modal');
        document.body.style.overflow="hidden";
    }

    const modalClose = ()=>{
        setModalClass('search-modal-close');
        document.body.style.overflow="auto";
        // return false;
    }

    const [searchValue, setSearchValue] = useState('');
    const [array, setArray] = useState(products);

    const searchChange = (e)=>{
        const val = e.target.value.toLowerCase().trim();
        const result = products.filter((product)=>{
            if (val ===''){
                return false;
            }
            else {
                return product.name.toLowerCase().includes(val);
            }
        });
        setSearchValue(val);
        setArray(result);
    }

    const [mobileMenu, setMobileMenu] = useState('mobile-menu-close');
    const [modalClass, setModalClass] = useState('search-modal-close');

    return (
        <header>
            <div className={modalClass}>
                <div className="modal-close">
                    <span onClick={modalClose}>
                        <CgClose />
                    </span>
                </div>
                <div className="search-input">
                    <input type="text" value={searchValue} onChange={searchChange} name="searchKeyword" id="searchKeyword" placeholder='Search entire store here...' />
                </div>
                <div className="search-results">
                    {(searchValue!=='')?
                    <div className="result-box">
                        <div className="result-heading">
                            <span className='result-title'>
                                Search Results
                            </span>
                            {(array.length!==0)?<Link className='all-result'>See All ({array.length})</Link>:<></>}
                        </div>
                        {(array.length===0)?<div className='no-result-found'>No Product Found</div>:<>
                        {array.map((product)=>(
                            <SearchResultCard product={product} key={product._id} clickfx={modalClose} />
                        ))}</>
                        }
                    </div>:<></>
                    }
                </div>
            </div>
            <nav>
                <div className="nav-left">
                    <div className="menu-icon" onClick={() => { setMobileMenu('mobile-menu'); window.scrollTo(0,0); document.body.style.overflow="hidden"; }}>
                        <BiMenuAltLeft />
                    </div>
                    <div className="social-icons">
                        <span className="facebook"><GrFacebookOption /></span>
                        <span className="twitter"><GrTwitter /></span>
                        <span className="google"><GrGooglePlus /></span>
                        <span className="instagram"><GrInstagram /></span>
                    </div>
                </div>
                <div className="nav-middle">
                    <div className="nav-links">
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li className='shop'>
                                <Link to='/products'>Shop</Link>
                                <span className='shop-new'>New</span>
                            </li>
                            <li><Link to='/products'>Products</Link></li>
                            <li><Link to='/about'>About Us</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="nav-logo">
                        <img src="https://claue2.arrowtheme.com/media/logo/stores/10/logo_claue_1.png" alt="nav-logo" />
                    </div>
                </div>
                <div className="nav-right">
                    <span className="search" onClick={searchClick}><IoIosSearch /></span>
                    <span className="account"><Link to='/login'><VscAccount /></Link></span>
                    <span className="wishlist"><Link to='/wishlist'><IoIosHeartEmpty /></Link></span>
                    <span className="cart">
                        <Link to='/cart'><BsCart3 /></Link>
                        <span className="total-item">0</span>
                    </span>
                </div>
            </nav >
            <div className={mobileMenu}>
                <div className="close-icon" onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}><CgClose /></div>
                <div className="column-menu">
                    <div className="mobile-logo">
                        <img src="https://claue2.arrowtheme.com/media/logo/stores/10/logo_claue_1.png" alt="nav-logo" />
                    </div>
                    <div className="mobile-menu-links">
                        <ul>
                            <li onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}><Link to='/'>Home</Link></li>
                            <li className='shop' onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}>
                                <Link to='/products'>Shop</Link>
                                <span className='shop-new-mobile'>New</span>
                            </li>
                            <li onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}><Link to='/products'>Products</Link></li>
                            <li onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}><Link to='/about'>About Us</Link></li>
                            <li onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}><Link to='/contact-us'>Contact Us</Link></li>
                            <li onClick={() => { setMobileMenu('mobile-menu-close'); document.body.style.overflow="auto"; }}><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bottom-bar">
                <span className="bottom-icon account"><Link to='/login' className='bottom-bar-icon'><VscAccount /></Link></span>
                <span className="bottom-icon wishlist"><Link to='/wishlist' className='bottom-bar-icon'><IoHeartOutline /></Link></span>
                <span className="bottom-icon home"><Link to='/' className='bottom-bar-icon'><IoHomeOutline /></Link></span>
                <span className="bottom-icon cart">
                    <Link to='/cart' className='bottom-bar-icon'><BsCart3 /></Link>
                    <span className="total-item-mobile">0</span>
                </span>
                <span className="bottom-icon setting" onClick={() => { setMobileMenu('mobile-menu'); window.scrollTo(0,0); document.body.style.overflow="hidden"; }}><IoSettingsOutline /></span>
            </div>
        </header >
    );
}

export default Navbar;