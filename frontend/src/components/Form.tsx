//* Library imports
import React, { useState } from "react";
import { Container, TextField, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

//* Stylesheet imports
import "./stylesheets/Form.css";

//* Interface imports
import { FormType } from "../interfaces/FormType";
import { emailValidation } from "../validation/emailValidation";
import { passwordValidation } from "../validation/passwordValidation";

const submitButtonStyle = {
  backgroundColor: "#05386B",
  color: "#FFF",
};

//? Form component
const Form: React.FC<FormType> = (props) => {
  const onCloseEvent = () => {
    props.closeCallback(false);
  };

  const fetchFromApi = async () => {
    //? Used for calling the Login/Register route
    const endpoint = props.type === "Login" ? "login" : "create";

    const url = `http://localhost:8005/user/public/${endpoint}`;
    const data = {
      email: email,
      password: password
    }
    try {
      const res = await axios.post(url, data);
      props.submitCallback(true);
      props.closeCallback(false);
      props.setEmailCallback(data.email.split("@")[0]);
      props.setJwtTokenCallback(res.data.token);

      if (endpoint === "login") {
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("email", data.email.split("@")[0]);
      }
    }
    catch (e) {
      console.error(e);

      if (endpoint === "login") {
        localStorage.setItem("jwtToken", "");
        localStorage.setItem("email", "");
      }
    }
  }

  const submitButtonCallback = async () => {
    await fetchFromApi();
    setEmail("");
    setPassword("");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [helperEmail, setEmailHelper] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [helperPassword, setPasswordHelper] = useState<string>("");

  return (
    <Container className="form-container" style={{ display: "flex" }}>
      <Grid
        container
        spacing={3}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Grid item>
          <TextField
            error={validEmail}
            helperText={helperEmail}
            onChange={(e) => {
              setEmail(e.target.value);
              let isValidEmail: boolean = emailValidation(e.target.value);
              setValidEmail(isValidEmail);
              setEmailHelper(isValidEmail ? "Invalid email" : "");
            }}
            value={email}
            label="Email"
            type={"email"}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            error={validPassword}
            helperText={helperPassword}
            value={password}
            onChange={(e) => {
              let isValidPassword: boolean = passwordValidation(e.target.value);
              setPassword(e.target.value);
              setValidPassword(isValidPassword);
              setPasswordHelper(isValidPassword ? "Try a stronger password" : "");
            }}
            label="Password"
            type={"password"}
          ></TextField>
        </Grid>
        <Grid container item className="grid-buttons" spacing={10}>
          <Grid item>
            <Button disabled={validEmail || validPassword} style={submitButtonStyle} onClick={submitButtonCallback}>
              {props.type}
            </Button>
          </Grid>
          <Grid item>
            <CloseIcon
              onClick={onCloseEvent}
              className="close-icon"
              fontSize="large"
            ></CloseIcon>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Form;
