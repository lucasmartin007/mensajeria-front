import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Registro } from "./components/Registro";

import { InicioSesion } from "./components/InicioSesion";


export let logueado = false;

export let registrarse = false;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {InicioSesion} />
        <Route exact path = "/registrarse" component = {Registro} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
