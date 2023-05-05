import '../style/Panel.css';
import React from 'react';
import {StarWrapper} from './StarWrapper'
import {Switch} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {setBasicLineMode, setIntermittentLineMode, setWideLineMode} from "../state/state";
import {useDispatch, useSelector} from "react-redux";


export function ElementPanel() {

    const dispatch = useDispatch()
    const oldBasicMode = useSelector(state => state.basicLineMode)
    const oldIntermittentLineMode = useSelector(state => state.intermittentLineMode)
    const wideLineMode = useSelector(state => state.wideLineMode)
    function invertBasicMode() {
        dispatch(setBasicLineMode(!oldBasicMode))
    }
    function invertIntermittentLineMode() {
        dispatch(setIntermittentLineMode(!oldIntermittentLineMode))
    }
    function invertWideLineMode() {
        dispatch(setWideLineMode(!wideLineMode))
    }
    return (
        <div id="panel-container">

            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>

            <FormControlLabel control={<Switch onChange={invertBasicMode}/>} label="Simple"  />
            <FormControlLabel control={<Switch onChange={invertIntermittentLineMode}/>} label="Line"  />
            <FormControlLabel control={<Switch onChange={invertWideLineMode}/>} label="Wide"  />

        </div>

    )
}
