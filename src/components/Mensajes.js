import React from 'react';

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from 'react-redux';

//react router
import { Redirect } from 'react-router';

import { store, persistor } from './Tienda/storePersist';


// action creator
function updateIdUsuario(idUsuario) {
    return {
      type: 'UPDATE',
      idUsuario,
    };
  }
  
  export const Mensajes = () => {
    let [usersSearch, setUsersSearch] = useState("");
    let [messagesSearch, setMessagesSearch] = useState("");
    
    const onUsersSearchChange = e => {
        setUsersSearch(e.target.value);
    }
    const onMessagesSearchChange = e => {
        setMessagesSearch(e.target.value);
    }

    const url_usuarios = "http://localhost:3000/usuarios-campos"
    const [listUsuariosInicial, setListUsuariosInicial] = useState([]);
    const [listUsuarios, setListUsuarios] = useState([]);

    const [listMensajesInicial, setListMensajesInicial] = useState([]);
    const [listMensajes, setListMensajes] = useState([])
    const [envMensaje, setEnvMensaje] = useState("")
    const onEnvMensajeChange = e => setEnvMensaje(e.target.value);

    //
    const idUsuario = store.getState().login.idUsuario
    const dispatch = useDispatch()
    const [idOtroUsuario, setIdOtroUsuario] = useState(0);

    //
    const [logueado, setLogueado] = useState(true)

    const cerrar_sesion = () => {
        store.dispatch(updateIdUsuario(0))
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

    //
    const buscNombreOtroUsuario = (id_otro_usuario) => {
        const url_ot_amigo = "http://localhost:3000/usuario-nombre/" + id_otro_usuario + "/"
        fetch(url_ot_amigo)
            .then(res => res.json())
            .then(r => {
                if(r.length > 0){
                    setNomOtroUsuario(r[0].username)
                }
            })
    }

    const cambiarUsuarios = () => {
        let arr_usuarios2 = []
        for(let i = 0; i < listUsuariosInicial.length; i++){
            if(listUsuariosInicial[i].username.indexOf(usersSearch) > -1){
                arr_usuarios2.push(listUsuariosInicial[i])
            }
        }
        setListUsuarios(arr_usuarios2)

    }

    const cambiarMensajes = () => {
        let arr_mensajes2 = []
        for(let i = 0; i < listMensajesInicial.length; i++){
            if(listMensajesInicial[i].message.indexOf(messagesSearch) > -1){
                arr_mensajes2.push(listMensajesInicial[i])
            }
        }
        setListMensajes(arr_mensajes2)

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
            .then(data => {
                setListMensajesInicial(data)
                setListMensajes(data)
            })
        }

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
            .then(data => {
                setListUsuariosInicial(data)
                setListUsuarios(data)
            })

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
        const establecerListUsuariosInicial = (listUsuariosInicial) => {
            setListUsuariosInicial(listUsuariosInicial);
        }
        establecerListUsuariosInicial(listUsuariosInicial);
    }, [listUsuariosInicial])

    useEffect(() => {
        const establecerListUsuarios = (listUsuarios) => {
            setListUsuarios(listUsuarios);
        }
        establecerListUsuarios(listUsuarios);
    }, [listUsuarios])

    useEffect(() => {
        const establecerEnvMensaje = (envMensaje) => {
            setEnvMensaje(envMensaje);
        }
        establecerEnvMensaje(envMensaje);
    }, [envMensaje])

    useEffect(() => {
        const establecerUsersSearch = (usersSearch) => {
            setUsersSearch(usersSearch);
        }
        establecerUsersSearch(usersSearch);

        cambiarUsuarios();
    }, [usersSearch])

    useEffect(() => {
        const messagesSearch = (messagesSearch) => {
            setUsersSearch(messagesSearch);
        }
        messagesSearch(messagesSearch);

        cambiarMensajes();
    }, [messagesSearch])

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
                    <div>
                        Buscar<br />
                        <input type="text" value={messagesSearch} onChange={onMessagesSearchChange} />
                    </div>
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
                    <div>
                        Buscar<br />
                        <input type="text" value={usersSearch} onChange={onUsersSearchChange} />
                    </div>
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
