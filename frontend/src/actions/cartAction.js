import axios from 'axios';

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