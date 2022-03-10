import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './users'

const appReducers = combineReducers({
    form: formReducer,
    users: users
});

/* USER_LOGOUT is a action to clear the store when user logs out */

const rootReducers = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }
    return appReducers(state, action);
};

export default rootReducers;