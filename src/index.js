import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//Redux
// import store from './components/Tienda/store';

//

import React from 'react'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import * as modelsUsuarios from './Tienda/IdUsuarioSlice'
import App from './App'


const store = init({
	modelsUsuarios,
})


ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
