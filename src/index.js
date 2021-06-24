import ReactDOM from 'react-dom';
import './index.css';
import ConnectedApp from "./App";
import reportWebVitals from './reportWebVitals';

import React from 'react';
import { render } from 'react-dom';
import configureStore from './components/Tienda/storePersist';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './components/Tienda/storePersist'


ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
    <PersistGate persistor = { persistor }>
    <ConnectedApp />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
