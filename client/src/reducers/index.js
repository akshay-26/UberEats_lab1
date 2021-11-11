import LoginReducer from './Login'
import LogoutReducer from './Logout'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import UserProfile from './UserProfile'

const allReducers = combineReducers({
    LoginReducer, UserProfile
})

const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, allReducers);
  
  export default persistedReducer;

// export default allReducers;