import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

export default function RawJson(props) {
  const orginalData = props.location.data;
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div>
      <List>
        <ListItem>{JSON.stringify(orginalData)} </ListItem>
      </List>
      <Button onClick={handleClick} variant="outlined" color="primary">
        GO BACK
      </Button>
    </div>
  );
}
