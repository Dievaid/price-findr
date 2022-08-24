import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import "./stylesheets/Finder.css";

import {
  Container,
  List,
  Collapse,
  Button,
  TextField,
  Paper,
  Zoom,
  Box,
} from "@mui/material";
import FetchedListItem from "./FetchedListItem";
import emagConsumer from "../scrape-consumers/emagConsumer";

const paperStylesheet = {
  maxHeight: 550,
  overflow: "auto",
};

const deleteButtonStyle = {
  maxWidth: "30%",
  width: 200,
  backGroundColor: "#E4001B"
};

const boxStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
}
interface FinderProps {
  jwtToken: string;
}
const Finder: React.FC<FinderProps> = (props) => {
  const [url, setUrl] = useState<string>("");
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  const toDeleteProducts = useRef<number[]>([]);

  const getTrackedProducts = () => {
    const getUrl = "http://localhost:8005/user/private/tracked";
    axios
      .get(getUrl, {
        headers: {
          Authorization: `Bearer ${props.jwtToken}`,
        },
      })
      .then((res) => {
        setItems(res.data.products);
      })
      .catch((_err) => []);
  };

  const deleteCallback = async () => {
    const urlToFetch = "http://localhost:8005/user/private/delete_list"
    await axios.delete(urlToFetch, {
      headers: {
        Authorization: `Bearer ${props.jwtToken}`,
      },
      data: toDeleteProducts.current
    })
    .then(() => {
      getTrackedProducts();
      toDeleteProducts.current = [];
    }).catch((err) => console.error(err));
  }

  const addCallback = async () => {
    const urlToFetch = "http://localhost:8005/user/private/add_product";
    let dataProd = undefined;
    await emagConsumer(url).then((e) => (dataProd = e));
    if (dataProd === undefined) {
      return;
    }
    await axios
      .post(urlToFetch, dataProd, {
        headers: {
          Authorization: `Bearer ${props.jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    getTrackedProducts();
  };

  useEffect(getTrackedProducts, [props.jwtToken]);

  return (
    <Container className="finder fade-in">
      <div className="top-bar">
        <h1>
          <b>findr</b> Browser
        </h1>
        <Collapse
          className="right-flex"
          in={addClicked}
          orientation="horizontal"
          timeout={500}
        >
          <Button onClick={addCallback}>Add</Button>
        </Collapse>
        <Collapse
          className="right-flex"
          in={addClicked}
          orientation="horizontal"
        >
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="URL"
            variant="filled"
            size="small"
          ></TextField>
        </Collapse>
        <AddIcon
          onClick={() => setAddClicked(!addClicked)}
          className="right-flex"
          fontSize="large"
        />
        <DeleteIcon
          className="right-flex"
          onClick={() => setDeleteClicked(!deleteClicked)}
          fontSize="large"
        />
      </div>
      <Paper style={paperStylesheet}>
        <List>
          {items.map((item) => (
            <FetchedListItem
              title={item.productName}
              dateHigh={item.highestPriceDate}
              dateLow={item.lowestPriceDate}
              date={item.requestDate}
              currency={item.currency}
              price={item.price}
              highestPrice={item.highestPriceOfAllTime}
              lowestPrice={item.lowestPriceOfAllTime}
              pid={item.id}
              deleteClicked={deleteClicked}
              key={item.id}
              refList={toDeleteProducts}
            />
          ))}
        </List>
      </Paper>
      <Box style={boxStyle} className="bottom-bar">
        <Zoom in={deleteClicked}>
          <Button variant="contained" onClick={deleteCallback} color="error" style={deleteButtonStyle}>
            DELETE
          </Button>
        </Zoom>
      </Box>
    </Container>
  );
};

export default Finder;
