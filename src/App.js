import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./helpers";
import { alertActions } from "./actions";
import Notifications, { notify } from "react-notify-toast";
import { Helmet } from "react-helmet";
import "./styles.css";
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
            <Helmet>
              <title>What They Said</title>
              <meta
                name="description"
                content="A portal for discovering and recording what politicians are saying about the issues that matter to you."
              />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
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
    alert,
  };
}

export default connect(mapStateToProps)(App);
