import { createSlice } from '@reduxjs/toolkit'

export const idUsuarioSlice = createSlice({
  name: 'idUsuario',
  initialState: {
    value: 0,
  },
  reducers: {
    editarId: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { editarId } = idUsuarioSlice.actions

export default idUsuarioSlice.reducer
