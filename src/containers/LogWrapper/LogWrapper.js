import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import routes from "../../routes/logRoutes.js";

class LogWrapper extends Component {
  render() {
    return (
      <Switch>
        {routes.map((args) => <Route key={args.path} {...args} />)}
      </Switch>
    );
  }
}

export default LogWrapper;
