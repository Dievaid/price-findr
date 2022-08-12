//* Library imports
import React from "react";
import { Container, TextField, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//* Stylesheet imports
import "./stylesheets/Form.css";

interface FormType {
  type: string;
  closeCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

const submitButtonStyle = {
  backgroundColor: "#05386B",
  color: "#FFF",
};

//? Form component
const Form: React.FC<FormType> = (props) => {
  const onCloseEvent = () => {
    props.closeCallback(false);
  };

  return (
    <Container
      className="form-container"
      style={{display: "flex" }}
    >
      <Grid
        container
        spacing={3}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Grid item>
          <TextField label="Email" type={"email"}></TextField>
        </Grid>
        <Grid item>
          <TextField label="Password" type={"password"}></TextField>
        </Grid>
        <Grid container item className="grid-buttons" spacing={10}>
          <Grid item>
            <Button style={submitButtonStyle}>{props.type}</Button>
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
