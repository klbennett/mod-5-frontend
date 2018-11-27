import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import { history } from "./helpers";
import { alertActions } from "./actions";

import "bulma/css/bulma.css";


import Nav from "./containers/Nav";

import * as action from './actions'
import ProfilePage from './containers/ProfilePage';


class App extends React.Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {

    return <>
        <Router>
          <div>
            <Nav />
          </div>
        </Router>
      </>;
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}



export default connect(mapStateToProps)(App)



