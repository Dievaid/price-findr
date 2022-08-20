//* Library includes
import React, { useState } from "react";

//* Stylesheet includes
import "./components/stylesheets/NoBorder.css";
import "./components/stylesheets/Wave.css";

//* Component includes
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { Collapse } from "@mui/material";
import Finder from "./components/Finder";
import { Container } from "@mui/system";

//? Main component
const App: React.FC = () => {
  const [isLogged, setLogged] = useState<boolean>(false);
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [registerClicked, setRegisterClicked] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  return (
    <Container>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <Navbar
        isLoggedIn={isLogged}
        setLoginClicked={setLoginClicked}
        setRegisterClicked={setRegisterClicked}
        setLogoutClicked={setLogged}
        email={email}
      />
      <Collapse in={loginClicked} collapsedSize={150}>
        <Form
          closeCallback={setLoginClicked}
          submitCallback={setLogged}
          setEmailCallback={setEmail}
          type="Login"
        ></Form>
      </Collapse>
      <Collapse in={registerClicked} collapsedSize={150}>
        <Form
          closeCallback={setRegisterClicked}
          type="Register"
          submitCallback={(_e) => undefined}
          setEmailCallback={(_e) => ""}
        ></Form>
      </Collapse>
      {isLogged && <Finder />}
    </Container>
  );
};
export default App;
