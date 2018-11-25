import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { hansard } from "./hansard.reducer";
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  hansard,
  registration,
  users,
  alert
});

export default rootReducer;