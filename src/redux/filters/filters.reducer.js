const initialState = {
    filters: ""
}

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "filters/changeFilter": {
            return {
              ...state, filters: action.payload
            }
        }

        default:
        return state
    }
   
}