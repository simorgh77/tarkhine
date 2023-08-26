import { legacy_createStore, combineReducers } from "redux";

import searchModalReducer from "../searchMenu"
import productReducer from "../product"
import userCartReducer from "../userCart"
import userWishlistReducer from "../userWishlist"
import SearchReducer from "../search"

const store = legacy_createStore(combineReducers({
    isSearchActive: searchModalReducer,
    products: productReducer,
    userCart: userCartReducer,
    userWishlist: userWishlistReducer,
    search: SearchReducer
}))

export default store