// Actions
const getWishlistCookie = 'GET_Wishlist_COOKIE';
// Reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case getWishlistCookie: {
            let newCartArray = action.payload;
            return newCartArray
        }


        default: {
            return state
        }
    }
}

// Action Creators
export const getWishlistCookieAct = (data) => {
    return {
        type: getWishlistCookie,
        payload: data
    }
}

