import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS, ALL_TRENDING_PRODUCT_REQUEST, ALL_TRENDING_PRODUCT_SUCCESS, ALL_TRENDING_PRODUCT_FAIL, TRENDING_PRODUCT_REQUEST, TRENDING_PRODUCT_SUCCESS, TRENDING_PRODUCT_FAIL } from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const trendingProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case TRENDING_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case TRENDING_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            };
        case TRENDING_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const allTrendingProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_TRENDING_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_TRENDING_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            };
        case ALL_TRENDING_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};