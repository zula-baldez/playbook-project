import {defaultState, SET_BASIC_LINE_MODE, SET_INTERMITTENT_LINE_MODE} from "../state/state.js";


export const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_BASIC_LINE_MODE: {
            return {
                ...state,
                basicLineMode: action.basicLineMode
            }
        }
        case SET_INTERMITTENT_LINE_MODE: {
            return {
                ...state,
                intermittentLineMode: action.intermittentLineMode
            }
        }
        default:
            return {
                ...state
            }
    }

}