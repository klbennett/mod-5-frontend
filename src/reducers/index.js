import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { hansard } from "./hansard.reducer";
import { alert } from './alert.reducer';
import { userlist } from './list.reducer';


const rootReducer = combineReducers({
  alert,
  authentication,
  hansard,
  registration,
  userlist,
  users
});

export default rootReducer;