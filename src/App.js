import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Registro } from "./components/Registro";

import { InicioSesion } from "./components/InicioSesion";

import { Mensajes } from "./components/Mensajes";

import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./components/Tienda/store";


function App() {
  return (
    <BrowserRouter>
      <PersistGate persistor = {persistor}>
      <Switch>
        <Route exact path = "/" component = {InicioSesion} />
        <Route exact path = "/registrarse" component = {Registro} />
        <Route exact path = "/mensajes" component = {Mensajes} />
      </Switch>
      </PersistGate>
    </BrowserRouter>
  )
}

export default App;
