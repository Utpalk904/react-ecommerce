export const userReducer = (state = { user: {}, isAuthenticated: false, loading: false }, action) => {
    switch (action.type) {
        case 'GET_USER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false,
                user: {}
            };
        case 'GET_USER_SUCCESS':
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            };
        case 'GET_USER_FAIL':
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            }
        case 'REGISTER_USER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false,
                user: {}
            };
        case 'REGISTER_USER_SUCCESS':
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            };
        case 'REGISTER_USER_FAIL':
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };
        case 'LOGIN_USER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false,
                user: {}
            };
        case 'LOGIN_USER_SUCCESS':
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            };
        case 'LOGIN_USER_FAIL':
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };
        default:
            return state;
    }
};
