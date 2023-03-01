import React from 'react';
import ReactDOM from 'react-dom/client';
import {BasketballField} from "./BasketballField";
import './layouts.css';
import {ElementPanel} from "./ElementPanel";
import {AccountComp} from "./AccountComp";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
      <AccountComp/>

      <div id="mainContainer">
          <BasketballField/>
          <ElementPanel/>
      </div>
  </React.StrictMode>
);

