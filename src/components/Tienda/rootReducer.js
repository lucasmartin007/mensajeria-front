import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import IdUsuarioReducer from "./IdUsuarioSlice";

const persistConfig = {
    key:"root",
    storage,
    whitelist: [ "InicioSesion", "Mensajes" ]
}

const rootReducer = combineReducers({
    InicioSesion: IdUsuarioReducer,
    Mensajes: IdUsuarioReducer,
})

export default persistReducer(persistConfig, rootReducer)
