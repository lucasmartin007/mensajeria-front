import React from 'react'

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { editarIdUsuario } from './Tienda/IdUsuarioSlice';
import { connect } from 'react-redux';

import store from "./Tienda/store";

//rematch

//react router
import { Redirect } from 'react-router';

    
export const InicioSesion = (props) => {
    // const { dispatch } = store
    const { dispatch } = store

    let [userUsername, setUserUsername] = useState("");
    let [userPassword, setUserPassword] = useState("");

    const onUserUsernameChange = e => setUserUsername(e.target.value);
    const onUserPasswordChange = e => setUserPassword(e.target.value);

    //
    // const idUsuario = useSelector((state) => state.idUsuario.value)
    // const dispatch = useDispatch()

    //
    const [logueado, setLogueado] = useState(false)

    //
    const [arrLogin, setArrLogin] = useState([]);
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
            // dispatch(editarId(r[0].id))
            // editarIdUsuario(r[0].id)
            props.editarIdUsuario()
            // setLogueado(true)

            // alert(r[0].id)
          }else{
            // dispatch(editarId(0))
            // editarIdUsuario(0)
            props.editarIdUsuario()
          }
        } )
    };

    const alertar = () => {
      alert("Hola")
    }

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
        <div>Id del usuario: {props.idUsuario}</div>
        </div>
    )
}

// export default InicioSesion

// const { tienda } = store

const mapState = (state) => ({
	idUsuario: state.usuario.idUsuario,
})

const mapDispatch = (dispatch) => ({
	editarIdUsuario:() => dispatch.usuario.editarIdUsuario(1),
})

// export default connect(mapState, mapDispatch)(InicioSesion)

export const InicioSesionContainer = connect(
  mapState,
  mapDispatch
)(InicioSesion)

