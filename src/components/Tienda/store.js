import { configureStore } from '@reduxjs/toolkit';

import idUsuarioReducer from './IdUsuarioSlice';

export default configureStore({
  reducer: {
      idUsuario: idUsuarioReducer,
  },
})

