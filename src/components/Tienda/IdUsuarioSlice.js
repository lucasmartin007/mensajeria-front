// import { createSlice } from '@reduxjs/toolkit'

// export const idUsuarioSlice = createSlice({
//   name: 'idUsuario',
//   initialState: {
//     value: 0,
//   },
//   reducers: {
//     editarId: (state, action) => {
//       state.value = action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { editarId } = idUsuarioSlice.actions

// export default idUsuarioSlice.reducer

const modelIdUsuarioSlice = {
  state: 0, // initial state
  reducers: {
      // handle state changes with pure functions
      editarIdUsuario(state, payload){
        return payload
      },
  },
  effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async editarIdUsuarioAsync(payload, rootState) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          // dispatch.count.increment(payload)
          dispatch.idUsuario.editarIdUsuario(payload)
      },
  }),
}

export default modelIdUsuarioSlice
