// Actions
const searchValue = "SEARCH_VALUE";
// Reducer
export default function reducer(state = '', action) {
    switch (action.type) {

        case searchValue: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
}


// Action Creators
export const searchValueAct = value => {
    return {
        type: searchValue,
        payload: value
    }
}