import React from 'react';
import '../style/playPage.css';
import {BasketballField} from "./BasketballField";
import {ElementPanel} from "./ElementPanel";
import {AccountComp} from "./AccountComp";
import {DndProvider} from 'react-dnd'
import {createStore} from "redux";
import {Provider} from "react-redux";
import * as redux from "redux";
import {reducer} from "../reducers/reducer";
import {HTML5Backend} from 'react-dnd-html5-backend';

const store = createStore(reducer)

export function PlayPage() {
    return (
        <div className="play-page-container">
            <div id="account-container">
                <div className="logo-acc-container">
                    <img src="logo.png"></img>
                </div>
                <AccountComp/>
            </div>
                <Provider store={store}>

                    <DndProvider backend={HTML5Backend}>
                        <div id="main-container">
                            <BasketballField/>
                            <ElementPanel/>
                        </div>
                    </DndProvider>
                </Provider>
        </div>
    )
}
