import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import routes from "../../routes/mainRoutes.js";

class AppWrapper extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((args) => <Route key={args.path} {...args} />)}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppWrapper;
