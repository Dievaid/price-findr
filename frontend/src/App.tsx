//* Library includes
import React from "react";
import { useState } from "react";

//* Stylesheet includes
import "./components/stylesheets/NoBorder.css";
import "./components/stylesheets/Wave.css";

//* Component includes
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { Collapse } from "@mui/material";

//? Main component
const App: React.FC = () => {
  const [isLogged, setLogged] = useState<boolean>(false);
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [registerClicked, setRegisterClicked] = useState<boolean>(false);

  return (
    <div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <Navbar
        isLoggedIn={isLogged}
        setLoginClicked={setLoginClicked}
        setRegisterClicked={setRegisterClicked}
      />
      <Collapse in={loginClicked} collapsedSize={150}>
        <Form closeCallback={setLoginClicked} type="Login"></Form>
      </Collapse>
      <Collapse in={registerClicked} collapsedSize={150}>
        <Form closeCallback={setRegisterClicked} type="Register"></Form>
      </Collapse>
    </div>
  );
};
export default App;
