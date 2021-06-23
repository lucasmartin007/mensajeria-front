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
import { usuario } from './index.tsx';

const store = init({ usuario }) //models

export default store

