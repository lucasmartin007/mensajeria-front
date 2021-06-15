import React from 'react'

import { useState, useEffect } from "react";

    
export const InicioSesion = () => {
    let [userEmail, setUserEmail] = useState("");
    let [userPassword, setUserPassword] = useState("");

    const onUserEmailChange = e => setUserEmail(e.target.value);
    const onUserPasswordChange = e => setUserPassword(e.target.value);

    //

    const handleSubmitLogin = e => {
        e.preventDefault();
    
        const data = {
            "email": userEmail,
            "password": userPassword,   };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch("http://localhost:3000/usuarios/login", requestOptions) // "https://jsonplaceholder.typicode.com/posts"
        .then(response => response.json())      
        .then(res => console.log(res));  
    };

//     useEffect(()=>{
//         const obt_usuario = () => fetch(url_login)
//             .then(res => res.json())
//             .then(data => console.log(data))
//    },[]);

    //

    return (
        <div className="div_inicio">
        <h2>Iniciar sesion</h2>
        {/* <form> */}
            Email de usuario<br />
            <input type="text" value={userEmail} onChange={onUserEmailChange} /><br /><br />
            Contraseña<br />
            <input type="password" value={userPassword} onChange={onUserPasswordChange} /><br /><br />
            <button onClick = {handleSubmitLogin}>Iniciar sesion</button><br /><br /> {/* */}

            <a href = "/registrarse">Ir al registro</a><br />
        {/* </form> */}
        </div>
    )
}

// export default InicioSesion
