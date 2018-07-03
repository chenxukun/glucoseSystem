import {combineReducers} from 'redux';
import postReducer from './postReducer';
import patientReducer from './patientReducer';

export default combineReducers({
    posts:postReducer,
    patients:patientReducer,
});