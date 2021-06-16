import React from 'react';

import ReactDOM from "react-dom";

import { useState, useEffect } from "react";


export const url_usuarios = "http://localhost:3000/usuarios-campos"

export const Mensajes = () => {
    const [listUsuarios, setListUsuarios] = useState([]);

    const [envMensaje, setEnvMensaje] = useState("")

    const onEnvMensajeChange = e => setEnvMensaje(e.target.value);

    useEffect(() => {
		fetch(url_usuarios)
            .then(res => res.json())
            .then(data => setListUsuarios(data))
	}, [])

    return (
        <div>
            <div className = "div_mensajes">
                <div className = "div_contenido">
                    Mensajes:<br />
                </div>

                <div className = "div_enviar_mensaje">
                    <input type='text' className = "inp_env_mensaje" value = {envMensaje} onChange = {onEnvMensajeChange} /> 
                    <button>ENVIAR</button>
                </div>
            </div>

            <div className = "div_usuarios">
                <div className = "div_ver_usuarios">
                    Usuarios:<br />
                    <ul>
                    {listUsuarios.map(usuar => (
                        <li key = {usuar.id}>
                            {usuar.username}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

// export default Mensajes
