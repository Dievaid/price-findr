import React, { useState } from "react";

import { ProductData } from "../interfaces/ProductData";

import {
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  Divider,
  Zoom,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import "./stylesheets/Finder.css";
import Checkbox from "@mui/material/Checkbox";

interface ProductDetails {
  title: string;
  price: number;
  currency: string;
  date: string;
}

const ListColumn: React.FC<ProductDetails> = (props) => {
  return (
    <ListItemText
      primary={props.title}
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: "inline" }}
            component="p"
            variant="body1"
            color="text.primary"
          >
            <b>{props.date}:</b>
            {` ${props.price} ${props.currency}`}
          </Typography>
        </React.Fragment>
      }
    ></ListItemText>
  );
};

const FetchedListItem: React.FC<ProductData> = (props) => {
  const [checked, setChecked] = useState<boolean>(false);

  const checkHandler = () => {
    if (!checked) {
      props.refList.current.push(props.pid);
    } else {
      props.refList.current = props.refList.current.filter(
        (el: number) => el !== props.pid
      );
    }
    setChecked(!checked);
  };

  return (
    <div>
      <ListItem className="list" alignItems="flex-start">
        <Zoom
          in={props.deleteClicked}
          style={{ transitionDelay: props.deleteClicked ? "200ms" : "0ms" }}
        >
          <Checkbox checked={checked} onChange={checkHandler} />
        </Zoom>
        <ListColumn
          title={props.title}
          price={props.price}
          currency={props.currency}
          date="Current"
        />
        <ListColumn
          title="Lowest Price"
          price={props.lowestPrice}
          currency={props.currency}
          date={props.dateLow}
        />
        <ListColumn
          title="Highest Price"
          price={props.highestPrice}
          currency={props.currency}
          date={props.dateHigh}
        />
        <ListItemAvatar>
          <RefreshIcon
            onClick={props.updateClicked}
            fontSize="large"
            className="rotate"
          />
        </ListItemAvatar>
      </ListItem>
      <Divider />
    </div>
  );
};

export default FetchedListItem;
