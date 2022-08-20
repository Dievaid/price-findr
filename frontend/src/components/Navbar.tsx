//* Library imports
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import Grow from "@mui/material/Grow";

interface NavProps {
  isLoggedIn: boolean;
  email: string;
  setLoginClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const navbarColor = {
  backgroundColor: "rgba(28, 12, 91, 0.45)",
  padding: 10,
  color: "#FFF",
};

const buttonStyle = {
  color: "#FFF",
};

//? Navbar Component
const Navbar: React.FC<NavProps> = (props) => {
  const loginOnClick = () => {
    props.setLoginClicked(true);
    props.setRegisterClicked(false);
  };

  const logoutOnClick = () => {
    props.setLogoutClicked(false);
  };

  const registerOnClick = () => {
    props.setRegisterClicked(true);
    props.setLoginClicked(false);
  };

  interface GrowProps {
    show: boolean;
    type: number;
    text: string;
    callback(): void;
  }
  const GrowFC: React.FC<GrowProps> = (childProps) => {
    const genertateElement = (id: number, text: string) => {
      switch (id) {
        case 1:
          //! Logout action button
          return (
            <Button style={buttonStyle} onClick={childProps.callback}>
              {text}
            </Button>
          );
        case 2:
          //! User details
          return <p>{text}</p>;
        default:
          return <div></div>;
      }
    };

    return (
      <Grow in={childProps.show} timeout={1000}>
        {genertateElement(childProps.type, childProps.text)}
      </Grow>
    );
  };

  return (
    <AppBar color="default" style={navbarColor}>
      <Toolbar>
        <IconButton>
          <MonetizationOnIcon />
        </IconButton>
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography variant="h6" component="p">
              price-findr.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Grid item>
            {props.isLoggedIn && (
              <GrowFC
                show={props.isLoggedIn}
                type={2} //? User details type number
                text={`User, ${props.email}`}
                callback={() => undefined}
              ></GrowFC>
            )}
          </Grid>
          <Grid item>
            {!props.isLoggedIn && (
              <GrowFC
              show={!props.isLoggedIn}
              type={1}
              text={"Login"}
              callback={loginOnClick}
            ></GrowFC>
            )}
            {!props.isLoggedIn && (
              <GrowFC
                show={!props.isLoggedIn}
                type={1}
                text={"Register"}
                callback={registerOnClick}
              ></GrowFC>
            )}
            {props.isLoggedIn && (
              <GrowFC
                show={props.isLoggedIn}
                type={1}
                text={"Logout"}
                callback={logoutOnClick}
              ></GrowFC>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
