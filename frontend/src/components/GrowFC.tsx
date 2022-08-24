
import Grow from "@mui/material/Grow";
import { Button } from "@mui/material";

import { GrowProps } from "../interfaces/GrowProps";

const buttonStyle = {
    color: "#FFF",
  };

export const GrowFC: React.FC<GrowProps> = (childProps) => {
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
        return (
          <p>
            User, <b>{text}</b>
          </p>
        );
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
