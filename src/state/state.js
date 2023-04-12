export const defaultState = {
    basicLineMode : false,
    intermittentLineMode: false
}


export const setBasicLineMode = (bsicLineMode) => {
    return {
        type: SET_BASIC_LINE_MODE,
        basicLineMode: bsicLineMode,
    }
}
export const setIntermittentLineMode = (intermittentLineMode1) => {
    return {
        type: SET_INTERMITTENT_LINE_MODE,
        intermittentLineMode: intermittentLineMode1,
    }
}
export const SET_BASIC_LINE_MODE = 'SET_BASIC_LINE_MODE'
export const SET_INTERMITTENT_LINE_MODE = 'SET_INTERMITTENT_LINE_MODE'