import * as React from 'react';

import "./stylesheets/NoBorder.css";

import { Container } from '@mui/system';
import { AppBar } from '@mui/material';

interface NavProps {
    isLoggedIn: boolean
}

const Navbar : React.FC<NavProps> = (props) => {
    return (
      <Container>
        <AppBar color="transparent"
                position="sticky"
                >
                price findr.
        </AppBar>
      </Container>
    );
};
export default Navbar;
