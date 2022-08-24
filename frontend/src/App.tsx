//* Library includes
import React, { useEffect, useState } from "react";

//* Stylesheet includes
import "./components/stylesheets/NoBorder.css";
import "./components/stylesheets/Wave.css";

//* Component includes
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { Collapse } from "@mui/material";
import Finder from "./components/Finder";
import { Container } from "@mui/system";
import axios from "axios";

//? Main component
const App: React.FC = () => {
  const [isLogged, setLogged] = useState<boolean>(false);
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [registerClicked, setRegisterClicked] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [jwtToken, setJwtToken] = useState<string>("");
  
  const validateJwtToken = () => {
    const url = "http://localhost:8005/jwt/validate";
    axios.post(url, {
      token: localStorage.getItem("jwtToken"),
    })
      .then((res) => setLogged(res.data))
      .catch(() => {
        setEmail("");
        setJwtToken("");
        localStorage.setItem("jwtToken", "");
        localStorage.setItem("email", "");
        setLogged(false);
    });
  }

  useEffect(() => {
    try {
      const emailLocalStorage: string | null = localStorage.getItem("email");
      const tokenLocalStorage: string | null = localStorage.getItem("jwtToken");
      
      const notNull = emailLocalStorage !== null && tokenLocalStorage !== null;
      const notEmpty = emailLocalStorage !== "" && tokenLocalStorage !== "";

      if (notEmpty && notNull) {
        setJwtToken(tokenLocalStorage);
        setEmail(emailLocalStorage);
        validateJwtToken();     
      }
      else {
        setLogged(false);
      }
    }
    catch (e) {
      setLogged(false);
    }
  }, []);

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
      <Container className="forms" style={{ paddingTop: "23vh" }}>
        <Collapse in={loginClicked} unmountOnExit>
          <Form
            closeCallback={setLoginClicked}
            submitCallback={setLogged}
            setEmailCallback={setEmail}
            setJwtTokenCallback={setJwtToken}
            type="Login"
          ></Form>
        </Collapse>
        <Collapse in={registerClicked} unmountOnExit>
          <Form
            closeCallback={setRegisterClicked}
            type="Register"
            submitCallback={(_e) => undefined}
            setEmailCallback={(_e) => ""}
            setJwtTokenCallback={(_e) => ""}
          ></Form>
        </Collapse>
      </Container>
      {isLogged && <Finder jwtToken={jwtToken}/>}
    </Container>
  );
};
export default App;
