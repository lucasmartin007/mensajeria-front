import { createSlice } from '@reduxjs/toolkit'

export const idOtroUsuarioSlice = createSlice({
  name: 'idOtroUsuario',
  initialState: {
    value: 0,
  },
  reducers: {
    editarOtroId: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { editarOtroId } = idOtroUsuarioSlice.actions

export default idOtroUsuarioSlice.reducer