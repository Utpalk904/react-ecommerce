import axios from 'axios';
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, ALL_TRENDING_PRODUCT_FAIL, ALL_TRENDING_PRODUCT_REQUEST, ALL_TRENDING_PRODUCT_SUCCESS, TRENDING_PRODUCT_REQUEST, TRENDING_PRODUCT_SUCCESS, TRENDING_PRODUCT_FAIL } from "../constants/productConstant";

export const getProduct = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCT_REQUEST
            });
            const { data } = await axios.get('http://localhost:4000/api/v1/products');
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message
            });
        }
    };

export const getTrendingProduct = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: TRENDING_PRODUCT_REQUEST
            });
            const { data } = await axios.get('http://localhost:4000/api/v1/trending-products');
            dispatch({
                type: TRENDING_PRODUCT_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: TRENDING_PRODUCT_FAIL,
                payload: error.response.data.message
            });
        }
    };

export const getAllTrendingProduct = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: ALL_TRENDING_PRODUCT_REQUEST
            });
            const { data } = await axios.get('http://localhost:4000/api/v1/all-trending-products');
            dispatch({
                type: ALL_TRENDING_PRODUCT_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: ALL_TRENDING_PRODUCT_FAIL,
                payload: error.response.data.message
            });
        }
    };

export const getProductDetails = (id) =>
    async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            });
            const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response.data.message
            });
        }
    };

export const clearErrors = () =>
    async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
    };