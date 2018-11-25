import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import List from "../List";
import User from "../User";

export default () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={List} />
        <Route path="/:username" component={User} />
      </div>
    </Router>
  );
};
