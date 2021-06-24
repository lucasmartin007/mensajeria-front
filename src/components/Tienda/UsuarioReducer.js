const defaultState = {
    idUsuario:0,
  };
  
  export default function(state=defaultState, action = {}) {
    switch(action.type) {
      case 'UPDATE':
        return {
          ...state,
          idUsuario:action.idUsuario,
        };
      default:
        return state;
    }
  }