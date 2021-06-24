export const usuario = {
	state: {
    idUsuario:0,
  },
	reducers: {
		editarIdUsuario: (idNuevo) => state.idUsuario = idNuevo,
	},
	effects: (dispatch) => ({
		async asyncEditarIdUsuario(idNuevo) {
			await new Promise((resolve) => {
				setTimeout(resolve, 1000)
			})

			dispatch.usuario.editarIdUsuario(idNuevo)
		},
	}),
}

