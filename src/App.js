import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Registro } from "./components/Registro";

import { InicioSesionContainer } from './components/InicioSesion';

import { Mensajes } from "./components/Mensajes";

import React from 'react'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {InicioSesionContainer} />
        <Route exact path = "/registrarse" component = {Registro} />
        <Route exact path = "/mensajes" component = {Mensajes} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
