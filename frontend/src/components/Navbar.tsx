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

interface NavProps {
  isLoggedIn: boolean;
  setLoginClicked: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const navbarColor = {
  backgroundColor: "#ffffff00",
  padding: 10
};

//? Navbar Component
const Navbar : React.FC<NavProps> = (props) => {
  const loginOnClick = () => {
    props.setLoginClicked(true);
    props.setRegisterClicked(false);
  }

  const registerOnClick = () => {
    props.setRegisterClicked(true);
    props.setLoginClicked(false);
  }
  return (
    <AppBar color="default" style={navbarColor}>
      <Toolbar>
        <IconButton>
          <MonetizationOnIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          price findr.
        </Typography>
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item>
            {!props.isLoggedIn && <Button onClick={loginOnClick}>Login</Button>}
            {!props.isLoggedIn && <Button onClick={registerOnClick}>Register</Button>}
            {props.isLoggedIn && <Button>Logout</Button>}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
