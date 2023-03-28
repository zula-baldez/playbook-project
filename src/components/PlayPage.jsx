import React from 'react';
import '../style/playPage.css';
import {BasketballField} from "./BasketballField";
import {ElementPanel} from "./ElementPanel";
import {AccountComp} from "./AccountComp";
import {DndProvider} from 'react-dnd'

import {HTML5Backend} from 'react-dnd-html5-backend';


export function PlayPage() {
    return (
        <div className="play-page-container">
            <div id = "account-container">
                <div className="logo-acc-container">
                    <img src="logo.png"></img>
                </div>
            <AccountComp/>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div id="main-container">
                    <BasketballField/>
                    <ElementPanel/>
                </div>
            </DndProvider>
        </div>
    )
}
