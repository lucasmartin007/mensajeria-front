import { configureStore } from '@reduxjs/toolkit';

import idUsuarioReducer from './IdUsuarioSlice';
import IdOtroUsuarioReducer from './IdOtroUsuarioSlice';

export default configureStore({
  reducer: {
      idUsuario: idUsuarioReducer,
      // idOtroUsuario: IdOtroUsuarioReducer
  },
})

