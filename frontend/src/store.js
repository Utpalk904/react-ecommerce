import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allTrendingProductReducer, productDetailsReducer, productReducer, trendingProductReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    trendingProducts: trendingProductReducer,
    allTrendingProducts: allTrendingProductReducer,
    user: userReducer,
    cart: cartReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;