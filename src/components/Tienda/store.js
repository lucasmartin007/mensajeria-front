// import { configureStore } from '@reduxjs/toolkit';

// import idUsuarioReducer from './IdUsuarioSlice';
// import IdOtroUsuarioReducer from './IdOtroUsuarioSlice';

// export default configureStore({
//   reducer: {
//       idUsuario: idUsuarioReducer,
//       // idOtroUsuario: IdOtroUsuarioReducer
//   },
// })

import { init } from '@rematch/core';
import modelIdUsuarioSlice from './IdUsuarioSlice';

const store = init({ modelIdUsuarioSlice }) //models

export default store

