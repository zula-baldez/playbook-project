export const defaultState = {
    basicLineMode : false,
    intermittentLineMode: false,
    wideLineMode: false,
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
export const setWideLineMode = (wide) => {
    return {
        type: SET_WIDE_LINE_MODE,
        wideLineMode: wide,
    }
}
export const SET_BASIC_LINE_MODE = 'SET_BASIC_LINE_MODE'
export const SET_INTERMITTENT_LINE_MODE = 'SET_INTERMITTENT_LINE_MODE'
export const SET_WIDE_LINE_MODE = 'SET_WIDE_LINE_MODE'
