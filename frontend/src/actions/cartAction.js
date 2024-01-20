import axios from 'axios';

// const baseUrl = 'http://localhost:4000/api/v1';
const baseUrl = 'https://ecommerce-backend-381k.onrender.com/api/v1';

export const getUserCart = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'GET_USER_CART_REQUEST'
            });
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({
                    type: 'GET_USER_CART_FAIL'
                });
                return;
            }
            const { data } = await axios.get(`${baseUrl}/cart`, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({
                type: 'GET_USER_CART_SUCCESS',
                payload: data
            });

        } catch (error) {
            dispatch({
                type: 'GET_USER_CART_FAIL',
                payload: error.response.data.message
            });
        }
    };

export const addToCart = (cartData) =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'ADD_TO_CART_REQUEST'
            });
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({
                    type: 'ADD_TO_CART_FAIL'
                });
                return;
            }
            const { data } = await axios.post(`${baseUrl}/add/cart/${cartData.id}/${cartData.q}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({
                type: 'ADD_TO_CART_SUCCESS',
                payload: data
            });

            dispatch(getUserCart());

        } catch (error) {
            dispatch({
                type: 'ADD_TO_CART_FAIL',
                payload: error.response.data.message
            });
        }
};

export const modifyCart = (cartData) =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'MODIFY_CART_REQUEST'
            });
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({
                    type: 'MODIFY_CART_FAIL'
                });
                return;
            }
            const { data } = await axios.post(`${baseUrl}/modify/cart`, { headers: { Authorization: `Bearer ${token}` }, params: cartData });
            dispatch({
                type: 'MODIFY_CART_SUCCESS',
                payload: data
            });

            dispatch(getUserCart());

        } catch (error) {
            dispatch({
                type: 'MODIFY_CART_FAIL',
                payload: error.response.data.message
            });
        }
    };