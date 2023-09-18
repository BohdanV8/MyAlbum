import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./styles/app.css";
import AppRouter from "./components/AppRouter";
import { UserContext } from "./context";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [emailOfUser, setEmailOfUser] = useState("");
  return (
    <UserContext.Provider
      value={{ isAuth, setIsAuth, emailOfUser, setEmailOfUser }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
