// Actions
const getProductSuccess = "GET_PRODUCT_SUCCESS";
const getProductError = "GET_PRODUCT_ERROR"

// Reducer
export default function reducer(state = [], action) {
    switch (action.type) {

        case getProductSuccess: {
            let allProduct = action.payload;
            return allProduct
        }

        case getProductError: {
            let productError = action.payload;
            return productError;
        }

        default: {
            return state;
        }
    }
}


// Action Creators
export const getAllProductAct = data => {
    return {
        type: getProductSuccess,
        payload: data
    }
}

export const getProductErrorAct = error => {
    return {
        type: getProductError,
        payload: error
    }
}