// import { configureStore } from '@reduxjs/toolkit';

// import idUsuarioReducer from './IdUsuarioSlice';
// import IdOtroUsuarioReducer from './IdOtroUsuarioSlice';

// export default configureStore({
//   reducer: {
//       idUsuario: idUsuarioReducer,
//       // idOtroUsuario: IdOtroUsuarioReducer
//   },
// })

import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore } from "redux-persist";

import logger from "redux-logger";

import thunk from "redux-thunk";

import rootReducer from "./rootReducer";


export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export const persistor = persistStore(store)

export default { store, persistor }

