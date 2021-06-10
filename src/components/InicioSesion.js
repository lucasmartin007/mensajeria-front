import React from 'react'

import { useState } from "react";

import { registrarse } from "../App";


export const InicioSesion = () => {
    const mostrar_registro = () => {
        registrarse = true;
    }

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    const onUserNameChange = e => setUserName(e.target.value);
    const onUserPasswordChange = e => setUserPassword(e.target.value);

    const handleSubmitLogin = e => {
        e.preventDefault();
    
        const data = {
          "n_usuario": userName, 
          "c_usuario": userPassword };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch("https://jsonplaceholder.typicode.com/posts", requestOptions) // "https://jsonplaceholder.typicode.com/posts"
        .then(response => response.json())      
        .then(res => console.log(res));  
    };

    return (
        <div className="div_inicio">
        <h2>Iniciar sesion</h2>
        <form>
            Nombre de usuario<br />
            <input type="text" value={userName} onChange={onUserNameChange} /><br /><br />
            Contraseña<br />
            <input type="password" value={userPassword} onChange={onUserPasswordChange} /><br /><br />
            <button onClick = {handleSubmitLogin}>Iniciar sesion</button><br /><br /> {/* */}

            <a href = "/registrarse">Registrarse</a><br />
        </form>
        </div>
    )
}

// export default InicioSesion
