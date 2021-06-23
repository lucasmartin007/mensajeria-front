import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Registro } from "./components/Registro";

// import { InicioSesion } from "./components/InicioSesion";
import { InicioSesionContainer } from './components/InicioSesion';

import { Mensajes } from "./components/Mensajes";
import store from './components/Tienda/store';
import { Provider } from 'react-redux';

import { init } from '@rematch/core';
import usuario from "./components/Tienda/IdUsuarioSlice";


const store2 = init({
	usuario,
})

function App() {
  return (
    <BrowserRouter>
      <Provider store = {store2}>
      <Switch>
        <Route exact path = "/" component = {InicioSesionContainer} />
        <Route exact path = "/registrarse" component = {Registro} />
        <Route exact path = "/mensajes" component = {Mensajes} />
      </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
