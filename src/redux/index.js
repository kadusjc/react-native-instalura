import { combineReducers } from 'redux'
import PhotoReducer from './reducers/PhotoReducer'

export default combineReducers({photosState: PhotoReducer})