import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import Auth0Provider from "./providers/auth0";

import "./index.css";

ReactDOM.render(
  <Router>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById("root"),
);
