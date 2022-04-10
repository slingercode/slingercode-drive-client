import { Routes, Route } from "react-router-dom";

import AppContainer from "./components/app-container";

import Home from "./pages";
import Dashboard from "./pages/dashboard";
import Upload from "./pages/upload";

import Authorization from "./providers/authorization";

const App = () => (
  <AppContainer>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <Authorization>
            <Dashboard />
          </Authorization>
        }
      />

      <Route
        path="/album/:album"
        element={
          <Authorization>
            <Upload />
          </Authorization>
        }
      />
    </Routes>
  </AppContainer>
);

export default App;
