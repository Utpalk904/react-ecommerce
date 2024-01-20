export const userReducer = (state = { cart: {} }, action) => {
    switch (action.type) {
        case 'GET_USER_CART_REQUEST':
            return {
                loading: true,
                ...state
            };
        case 'GET_USER_CART_SUCCESS':
            return {
                loading: false,
                cart: action.payload.user
            };
        case 'GET_USER_CART_FAIL':
            return {
                loading: false,
                error: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};
