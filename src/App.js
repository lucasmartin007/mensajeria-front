import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Registro } from "./components/Registro";

import { InicioSesion } from "./components/InicioSesion";

import { Mensajes } from "./components/Mensajes";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path = "/" component = {InicioSesion} />
          <Route exact path = "/registrarse" component = {Registro} />
          <Route exact path = "/mensajes" component = {Mensajes} />
        </Switch>
    </BrowserRouter>
  )
}

export default App;
