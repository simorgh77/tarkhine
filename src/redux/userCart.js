// Actions
const getCartCookie = 'GET_CART_COOKIE';
// Reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case getCartCookie: {
            let newCartArray = action.payload;
            return newCartArray
        }


        default: {
            return state
        }
    }
}

// Action Creators
export const getCartCookieAct = (data) => {
    return {
        type: getCartCookie,
        payload: data
    }
}

