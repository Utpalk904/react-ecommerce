import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import Login from './pages/Login';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import TrendingProducts from './pages/TrendingProducts';
import SignUp from './pages/SignUp';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './actions/userAction';
import { getUserCart } from './actions/cartAction';
// import Loader from './components/Loader';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  
  const { isAuthenticated } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserCart());
    }
  }, [dispatch, isAuthenticated])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<Home />} />
        <Route exact path='/contact-us' element={<ContactUs />} />
        <Route exact path='/shop' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/trending-products' element={<TrendingProducts />} />
        <Route exact path='/cart' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        {isAuthenticated && <Route exact path='/account' element={<Home />} />}

        <Route exact path='/register' element={<SignUp />} />
        <Route exact path='/wishlist' element={<Home />} />
        <Route exact path='/product/:id' element={<SingleProduct />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;