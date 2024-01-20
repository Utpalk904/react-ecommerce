export const cartReducer = (state = { cart: {} }, action) => {
    switch (action.type) {
        case 'GET_USER_CART_REQUEST':
            return {
                cartLoading: true,
                ...state
            };
        case 'GET_USER_CART_SUCCESS':
            return {
                cartLoading: false,
                cart: action.payload.userCart
            };
        case 'GET_USER_CART_FAIL':
            return {
                cartLoading: false,
                cartError: action.payload
            };
        case 'ADD_TO_CART_REQUEST':
            return {
                cartLoading: true,
                ...state
            };
        case 'ADD_TO_CART_SUCCESS':
            return {
                cartLoading: false,
                ...state
            };
        case 'ADD_TO_CART_FAIL':
            return {
                cartLoading: false,
                cartError: action.payload
            };
        case 'MODIFY_CART_REQUEST':
            return {
                cartLoading: true,
                ...state
            };
        case 'MODIFY_CART_SUCCESS':
            return {
                cartLoading: false,
                ...state
            };
        case 'MODIFY_CART_FAIL':
            return {
                cartLoading: false,
                cartError: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                cartError: null,
            }
        default:
            return state;
    }
};
