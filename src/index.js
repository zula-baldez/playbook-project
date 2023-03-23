import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {BasketballField} from "./components/BasketballField";
import {ElementPanel} from "./components/ElementPanel";
import {AccountComp} from "./components/AccountComp";
import {LoginComp} from "./components/LoginComp";
import {PlayPage} from "./components/PlayPage";

import {DndProvider} from 'react-dnd'

import {HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/login' element={< LoginComp/>}/>
                <Route path='/play-field' element={< PlayPage/>}/>
                <Route path='/' element={< LoginComp/>}/>

            </Routes>
        </Router>
    </React.StrictMode>
);