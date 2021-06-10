import React from 'react'

import { useState } from "react";

import { useEffect } from "react";


export const Registro = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const onUserNameChange = e => setUserName(e.target.value);
    const onUserEmailChange = e => setUserEmail(e.target.value);
    const onUserPasswordChange = e => setUserPassword(e.target.value);

    const handleSubmitUser = e => {
        e.preventDefault();
    
        const data = { 
          "email": userEmail, 
          "password": userPassword,
          "username": userName,  };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch("http://localhost:3000/user", requestOptions) // "https://jsonplaceholder.typicode.com/posts"
        .then(response => response.json())      
        .then(res => console.log(res));  
    };

    return (
        <div className="div_inicio">
        <h2>Registrar usuario</h2>
        <form>
            Nuevo usuario<br />
            <input type="text" value={userName} onChange={onUserNameChange} /><br /><br />
            Nueva contraseña<br />
            <input type="password" value={userPassword} onChange={onUserPasswordChange} /><br /><br />
            Mail del nuevo usuario<br />
            <input type="text" value={userEmail} onChange={onUserEmailChange} /><br /><br />
            <button onClick = {handleSubmitUser}>Registrarse</button><br />
        </form>
        <br />
        <a href = "/">Volver a inicio de sesion</a>
      </div>
    )
}

// export default Registro
