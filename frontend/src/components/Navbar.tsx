//* Library imports
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";


import "./stylesheets/Navbar.css";

import { NavProps } from "../interfaces/NavProps";

import { GrowFC } from "./GrowFC";

const navbarColor = {
  backgroundColor: "rgba(28, 12, 91, 0.45)",
  padding: 10,
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
    localStorage.setItem("jwtToken", "");
    localStorage.setItem("email", "");
  };

  const registerOnClick = () => {
    props.setRegisterClicked(true);
    props.setLoginClicked(false);
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
            <Typography variant="h6" component="h6">
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
                text={props.email}
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
