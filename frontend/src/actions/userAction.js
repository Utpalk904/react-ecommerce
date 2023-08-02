import axios from 'axios';

const baseUrl = 'https://ecommerce-backend-381k.onrender.com/api/v1';

export const getUserDetails = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'GET_USER_REQUEST'
            });
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({
                    type: 'GET_USER_FAIL'
                });
                return;
            }
            const { data } = await axios.get(`${baseUrl}/me`, { headers: { Authorization: `${token}` } });
            dispatch({
                type: 'GET_USER_SUCCESS',
                payload: data
            });
            
        } catch (error) {
            dispatch({
                type: 'GET_USER_FAIL',
                payload: error.response.data.message
            });
        }
    };

export const registerUser = (formData) =>
    async (dispatch) => {
        try {
            dispatch({
                type: "REGISTER_USER_REQUEST"
            });
            const { data } = await axios.post(`${baseUrl}/register`, formData, { headers: {"Content-Type": 'application/json'} });
            dispatch({
                type: 'REGISTER_USER_SUCCESS',
                payload: data
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            dispatch({
                type: 'REGISTER_USER_FAIL',
                payload: error.response.data.message
            });
        }
    };

    export const loginUser = (formData) =>
    async (dispatch) => {
        try {
            dispatch({
                type: "LOGIN_USER_REQUEST"
            });
            const { data } = await axios.post(`${baseUrl}/LOGIN`, formData, { headers: {"Content-Type": 'application/json'} });
            dispatch({
                type: 'LOGIN_USER_SUCCESS',
                payload: data
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            dispatch({
                type: 'LOGIN_USER_FAIL',
                payload: error.response.data.message
            });
        }
    };

export const clearErrors = () =>
    async (dispatch) => {
        dispatch({ type: 'CLEAR_ERRORS' });
    };