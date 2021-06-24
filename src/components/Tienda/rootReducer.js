import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from "./loginReducer"


const persistConfig = {
key:"root",
storage,
whitelist:['login']
}

const rootReducer = combineReducers({
login:loginReducer
})

export default persistReducer(persistConfig, rootReducer)