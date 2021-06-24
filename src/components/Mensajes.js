import React from 'react';

import ReactDOM from "react-dom";

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { editarId } from './Tienda/IdUsuarioSlice';

//react router
import { Redirect } from 'react-router';

import { store, persistor } from './Tienda/storePersist';


export const Mensajes = () => {
    const url_usuarios = "http://localhost:3000/usuarios-campos"
    const [listUsuarios, setListUsuarios] = useState([]);

    const [listMensajes, setListMensajes] = useState([])
    const [envMensaje, setEnvMensaje] = useState("")
    const onEnvMensajeChange = e => setEnvMensaje(e.target.value);

    //
    const idUsuario = store.getState().login.idUsuario
    const dispatch = useDispatch()
    // const idOtroUsuario = useSelector((state) => state.idOtroUsuario.value)
    const [idOtroUsuario, setIdOtroUsuario] = useState(0);

    //
    const [logueado, setLogueado] = useState(true)

    const cerrar_sesion = () => {
        dispatch(editarId(0))
        window.location.replace("")
    }

    //
    const url_us_actual = "http://localhost:3000/usuario-nombre/" + idUsuario + "/"
    const [nomUsuario, setNomUsuario] = useState("")
    const [nomOtroUsuario, setNomOtroUsuario] = useState("")

    const verificar_login = () => {
        if(idUsuario !== 0){
            setLogueado(true)
        }else{
            setLogueado(false)
        }
    }

    // //
    // const establecerOtroId = (id_otro_usuario) => {
    //     // alert("Estableciendo..." + id_otro_usuario)
    //     // dispatch(editarOtroId(id_otro_usuario))
    //     setIdOtroUsuario(id_otro_usuario);
    //     // alert(idOtroUsuario)
    //     buscNombreOtroUsuario(idOtroUsuario);

    //     // alert(idOtroUsuario)

    //     verMensajes();
    // }
    const buscNombreOtroUsuario = (id_otro_usuario) => {
        const url_ot_amigo = "http://localhost:3000/usuario-nombre/" + id_otro_usuario + "/"
        fetch(url_ot_amigo)
            .then(res => res.json())
            .then(r => {
                if(r.length > 0){
                    setNomOtroUsuario(r[0].username)
                }
            })
        // alert(nomOtroUsuario)
        // alert(idOtroUsuario)
        // setTimeout((alert(idOtroUsuario)), 500)
    }

    const verMensajes = () => {
        const url_ver_mensajes = "http://localhost:3000/ver-mensajes";
        const dataMensajes = { 
            "idUsuario": idUsuario,
            "idOtroUsuario": idOtroUsuario   };
        const requestOptionsMensajes = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataMensajes)
        };
        if(idUsuario !== 0 && idOtroUsuario !== 0){
		fetch(url_ver_mensajes, requestOptionsMensajes)
            .then(res => res.json())
            .then(data => setListMensajes(data))
        }

        // console.log("Viendo mensajes");

        console.log(listMensajes)
    }
    
    const handleSubmitMensaje = e => {
        e.preventDefault();
    
        const data = {
            "sender": idUsuario,
            "receiver": idOtroUsuario,
            "message":envMensaje   };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch("http://localhost:3000/messages", requestOptions) // "https://jsonplaceholder.typicode.com/posts"
            .then(response => response.json())
            .then(r => console.log("Mensaje enviado"))

        setEnvMensaje("")

        // alert("Mensaje enviado")

        verMensajes()
    };

    useEffect(() => {
        verificar_login()

        const dataUsuario = { 
            "idUsuario": idUsuario,   };
        const requestOptionsUsuarios = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUsuario)
        };
		fetch(url_usuarios, requestOptionsUsuarios)
            .then(res => res.json())
            .then(data => setListUsuarios(data))

        fetch(url_us_actual)
            .then(res => res.json())
            .then(r => {
                if(r.length > 0){
                    setNomUsuario(r[0].username)
                }
            })
	}, [])

    useEffect(() => {
        const establecerOtroId = (idOtroUsuario) => {
            setIdOtroUsuario(idOtroUsuario);
            buscNombreOtroUsuario(idOtroUsuario);
            verMensajes();
        }
        establecerOtroId(idOtroUsuario);
    }, [idOtroUsuario])

    useEffect(() => {
        const establecerMensajes = (listMensajes) => {
            setListMensajes(listMensajes);
        }
        establecerMensajes(listMensajes);
    }, [listMensajes])

    useEffect(() => {
        const establecerEnvMensaje = (envMensaje) => {
            setEnvMensaje(envMensaje);
        }
        establecerEnvMensaje(envMensaje);
    }, [envMensaje])

    if(!logueado){
        return <Redirect to='/'/>;
    }

    return (
        <div>
            <div className = "div_usuario_actual">
                <h2>Hola {nomUsuario} :)</h2>
                <button onClick = {cerrar_sesion}>Cerrar sesion</button>                
            </div>

            <div className = "div_mensajes">
                <div className = "div_contenido">
                    Mensajes:<br />
                    <div className = "div_ver_mensajes">
                        <div className = "div_nom_otro">
                            <span><b>{nomOtroUsuario}</b></span>
                        </div>
                        <div className = "div_los_mensajes">
                            {listMensajes.map(mensaj => (
                                <div className = "div_item_mensaje" className = {mensaj.sender == idUsuario ? "it_mensaj_derecha" : "it_mensaj_izquierda"}>
                                <span key = {mensaj.id} className = "it_mensaje">
                                    {mensaj.message}
                                </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className = "div_enviar_mensaje">
                    <input type='text' className = "inp_env_mensaje" value = {envMensaje} onChange = {onEnvMensajeChange} /> 
                    <button onClick = {handleSubmitMensaje}>ENVIAR</button>
                </div>
            </div>

            <div className = "div_usuarios">
                <div className = "div_ver_usuarios">
                    Usuarios:<br />
                    <section>
                    {listUsuarios.map(usuar => (
                        <div className = "div_item_usuario" onClick = {() => {setIdOtroUsuario(usuar.id)}}>
                        <span key = {usuar.id}>
                            {usuar.username}
                        </span>
                        </div>
                    ))}
                    </section>
                </div>
            </div>
            
        </div>
    )
}
// export default Mensajes
