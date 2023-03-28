import '../style/Panel.css';
import React, {useRef, useState} from 'react';
import {StarWrapper} from './StarWrapper'
export function ElementPanel() {


    return (
        <div id="panel-container">

            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
            <StarWrapper/>
        </div>

    )
}
