// Actions
const toggleSearchModal = "TOGGLE-SEARCH-MODAL";


// Reducer
export default function reducer(state = false, action) {
    switch (action.type) {
        case toggleSearchModal: {
            return !state
        } default: {
            return state
        }
    }

}

// Action Creators
export const toggleSearchModalAction = (data) => {
    return {
        type: toggleSearchModal,
        payload: data
    }
}