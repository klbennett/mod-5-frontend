import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { hansard } from "./hansard.reducer";
import { alert } from './alert.reducer';
import { list } from './list.reducer';


const rootReducer = combineReducers({
  alert,
  authentication,
  hansard,
  registration,
  list,
  users
});

export default rootReducer;