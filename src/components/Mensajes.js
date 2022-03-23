import React from 'react';

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from 'react-redux';

//react router
import { Redirect } from 'react-router';

import { store, persistor } from './Tienda/storePersist';

import moment from 'moment';

import axios from 'axios';


// action creator
function updateIdUsuario(idUsuario) {
    return {
      type: 'UPDATE',
      idUsuario,
    };
  }
  
  export const Mensajes = () => {
    let [usMessSearch, setUsMessSearch] = useState("");

    //
    const [selectedFile, setSelectedFile] = useState();
    const [ isFileSelected, setIsFileSelected ] = useState(false);
	const [isFilePicked, setIsFilePicked] = useState(false);
    
    const onUsMessSearchChange = e => {
        setUsMessSearch(e.target.value);
        // setListMensajes(listMensajes.filter(x => x.message.indexOf(usMessSearch) > -1))
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
            if(listUsuariosInicial[i].username.indexOf(usMessSearch) > -1){
                arr_usuarios2.push(listUsuariosInicial[i])
            }
        }
        setListUsuarios(arr_usuarios2)

    }

    const cambiarMensajes = () => {
        let arr_mensajes2 = []
        for(let i = 0; i < listMensajesInicial.length; i++){
            if(listMensajesInicial[i].message.indexOf(usMessSearch) > -1){
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
    }

    const changeFileHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFileSelected(true);

	};

    //
    function getDataUrl(img) {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set width and height
        canvas.width = img.width;
        canvas.height = img.height;
        // Draw the image
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/jpeg');
     }
    
    const handleSubmitMensaje = e => {
        e.preventDefault();

        let fecha = new Date();
    
        let data = [];
        if(isFileSelected){
            data = {
                "sender": idUsuario,
                "receiver": idOtroUsuario,
                "message":selectedFile.name,
                "created_at":fecha,
                "es_archivo":true,
                "nombre_archivo":selectedFile.name,
            };
            setSelectedFile([]);
        }else{
            data = {
                "sender": idUsuario,
                "receiver": idOtroUsuario,
                "message":envMensaje,
                "created_at":fecha,
                "es_archivo":false,
                "nombre_archivo":"",
            };
        }
        
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };        
        fetch("http://localhost:3000/messages", requestOptions) // "https://jsonplaceholder.typicode.com/posts"
            .then(response => response.json())
            .then(r => {
                console.log("Mensaje enviado")
                verMensajes()
            })
            
        if(isFileSelected){
        let nom_archivo = selectedFile.name;
        let ext_archivo = getFileExtension1(nom_archivo);
        if(ext_archivo === "txt"){
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post("http://localhost:3000/textFile", formData);
        }else if(ext_archivo === "jpg"){
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post("http://localhost:3000/imageFile", formData);
        }
        
        }

        setEnvMensaje("")
    };

    function getFileExtension1(filename) {
        return filename.split('.').pop();
    }
      

    const desc_archivo_texto = (mensaje, fecha) => {
        const nomarchivo = mensaje;
        const fecha_numerica = Date.parse(fecha)

        const url_desc_archivo = "http://localhost:3000/textFiles/" + nomarchivo + "/" + fecha_numerica
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = nomarchivo
        axios
        .get(url_desc_archivo, {
            responseType: "blob",
        })
        .then((res) => {
            link.href = URL.createObjectURL(
            new Blob([res.data], { type: "file/txt" })
            );
            link.click();
        });
    }

    const desc_archivo_imagen = (mensaje, fecha) => {
        const nomarchivo = mensaje;
        const fecha_numerica = Date.parse(fecha)

        const url_desc_archivo = "http://localhost:3000/imageFiles/" + nomarchivo + "/" + fecha_numerica
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = nomarchivo
        axios
        .get(url_desc_archivo, {
            responseType: "blob",
        })
        .then((res) => {
            link.href = URL.createObjectURL(
            new Blob([res.data], { type: "file/jpg" })
            );
            link.click();
        });
    }

    const obtener_base64_imagen = (mensaje, fecha) => {
        const nomarchivo = mensaje;
        const fecha_numerica = Date.parse(fecha)

        const url_obtener_base64 = "http://localhost:3000/base64ImageFile/" + nomarchivo + "/" + fecha_numerica
        // const link = document.createElement("a");
        // link.target = "_blank";
        // link.download = nomarchivo
        axios
        .get(url_obtener_base64, {
            responseType: "base64",
        })
        .then((res) => {
            // link.href = URL.createObjectURL(
            // new Blob([res.data], { type: "file/jpg" })
            // );
            // link.click();
            alert(res);
        });
    }

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
            setUsMessSearch("");
            setListMensajes([]);
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
        const usMessSearch = (usMessSearch) => {
            setUsMessSearch(usMessSearch);
        }
        usMessSearch(usMessSearch);

        cambiarUsuarios();
        cambiarMensajes();
    }, [usMessSearch])

    if(!logueado){
        return <Redirect to='/'/>;
    }

    return (
        <div>
            <div className = "div_usuario_actual">
                <h2>Hola {nomUsuario} :)</h2>
                <div>
                    Buscar<br />
                    <input type="text" value={usMessSearch} onChange={onUsMessSearchChange} className = "inp_busq_us_mensajes" />
                </div>
                <br />
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
                                    <span>{mensaj.message}</span>
                                    {mensaj.es_archivo && getFileExtension1(mensaj.message) === "txt" ? (
                                        <span className = "it_mensaj_descarga" onClick = {() => desc_archivo_texto(mensaj.message, mensaj.created_at)}>Descargar</span>
                                    ) : (
                                        <span></span>
                                    )}
                                    {mensaj.es_archivo && getFileExtension1(mensaj.message) === "jpg" ? (
                                        <span className = "it_mensaj_descarga" onClick = {() => {desc_archivo_imagen(mensaj.message, mensaj.created_at); }}>Descargar</span>
                                    ) : (
                                        <span></span>
                                    )}
                                    
                                </span>
                                <br />
                                <span className = "it_mensaj_fecha">
                                    {moment(mensaj.created_at).format("HH:mm")}
                                </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className = "div_enviar_mensaje">
                    <form encType = "multipart/form-data" onSubmit = {handleSubmitMensaje}>
                    <input type='text' className = "inp_env_mensaje" value = {envMensaje} onChange = {onEnvMensajeChange} />
                    <input type = "file"  onChange={changeFileHandler}/>
                    <br />
                    <button type = "submit">ENVIAR</button>
                    {isFileSelected && selectedFile !== [] ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                    </div>
                    ) : (
                    <p>Select a file to show details</p>
                    )}
                    </form>

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
