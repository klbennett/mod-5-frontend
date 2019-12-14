import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./helpers";
import { alertActions } from "./actions";
import Notifications, { notify } from "react-notify-toast";

import "bulma/bulma.css";
import Nav from "./containers/Nav";
import Footer from "./components/Footer";

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
    return (
      <>
        <Router>
          <div>
            <Nav />
            <Notifications />
          </div>
        </Router>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
