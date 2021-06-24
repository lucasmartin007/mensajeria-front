import React, { Component, PropTypes } from 'react'

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { editarId } from './Tienda/IdUsuarioSlice';

//react router
import { Redirect } from 'react-router';

import { store, persistor } from './Tienda/storePersist';

import { Provider, connect } from 'react-redux';


// action creator
function updateIdUsuario(idUsuario) {
  return {
    type: 'UPDATE',
    idUsuario,
  };
}

export const InicioSesion = ({ usuario }) => {
    let [userUsername, setUserUsername] = useState("");
    let [userPassword, setUserPassword] = useState("");

    const onUserUsernameChange = e => setUserUsername(e.target.value);
    const onUserPasswordChange = e => setUserPassword(e.target.value);
    
    const [logueado, setLogueado] = useState(false)

    const dispatch = useDispatch()
    
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
            store.dispatch(updateIdUsuario(r[0].id))

            setLogueado(true)
          }else{
            store.dispatch(updateIdUsuario(0))
          }
        } )
    };

    useEffect(() => {
        console.log(store)
	  }, [])

    //
    if (logueado) {
        return <Redirect to='/mensajes'/>;
    }
    return (
        <div className="div_inicio">
        <h2>Iniciar sesion</h2>
        <form>
            Nombre de usuario<br />
            <input type="text" value={userUsername} onChange={onUserUsernameChange} /><br /><br />
            Contraseña<br />
            <input type="password" value={userPassword} onChange={onUserPasswordChange} /><br /><br />
            <button onClick = {handleSubmitLogin}>Iniciar sesion</button><br /><br /> {/* */}
            <br />

            <a href = "/registrarse">Ir al registro</a><br />
        </form>
            <div>Id de usuario: {store.getState().login.idUsuario}</div>
        </div>
    )
}

// export default InicioSesion

//

const mapStateToProps = state => ({
  value: state.usuario.idUsuario
});

const mapDispatchToProps = {
  onUpdateId: () => ({type:"UPDATE"})
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InicioSesion);

