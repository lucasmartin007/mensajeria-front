import React from 'react'

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { editarIdUsuario } from './Tienda/IdUsuarioSlice';
import { connect } from 'react-redux';

import store from "./Tienda/store";

//react router
import { Redirect } from 'react-router';

    
export const InicioSesion = (props) => {

    let [userUsername, setUserUsername] = useState("");
    let [userPassword, setUserPassword] = useState("");

    const onUserUsernameChange = e => setUserUsername(e.target.value);
    const onUserPasswordChange = e => setUserPassword(e.target.value);
    
    const [logueado, setLogueado] = useState(false)
    
    const handleSubmitLogin = e => {
        e.preventDefault();
    
        const data = {
            "username": userUsername,
            "password": userPassword,   };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch("http://localhost:3000/usuarios/login", requestOptions) // "https://jsonplaceholder.typicode.com/posts"
        .then(response => response.json())
        .then(r => {
          if(r.length > 0){
            props.usuario.editarIdUsuario(0)
            // setLogueado(true)
          }else{
            props.usuario.editarIdUsuario(0)
          }
        } )
    };

    //
    if (logueado) {
        return <Redirect to='/mensajes'/>;
    }
    return (
        <div className="div_inicio">
        <h2>Iniciar sesion</h2>
        {/* <form> */}
            Nombre de usuario<br />
            <input type="text" value={userUsername} onChange={onUserUsernameChange} /><br /><br />
            Contraseña<br />
            <input type="password" value={userPassword} onChange={onUserPasswordChange} /><br /><br />
            <button onClick = {handleSubmitLogin}>Iniciar sesion</button><br /><br /> {/* */}
            <br />

            <a href = "/registrarse">Ir al registro</a><br />
        {/* </form> */}
        <div>Id del usuario: {props.usuario.idUsuario}</div>
        </div>
    )
}

// export default InicioSesion

// const { tienda } = store

import { init } from '@rematch/core'
import * as modelsUsuarios from './Tienda/IdUsuarioSlice'

const store = init({
	modelsUsuarios,
})

const mapState = (state) => ({
	idUsuario: store.modelsUsuarios.state.usuario.idUsuario,
})

const mapDispatch = (dispatch) => ({
	editarIdUsuario:() => store.modelsUsuarios.dispatch.usuario.editarIdUsuario(1),
})

// export default connect(mapState, mapDispatch)(InicioSesion)

export const InicioSesionContainer = connect(
  mapState,
  mapDispatch
)(InicioSesion)

