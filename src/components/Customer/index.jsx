import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NavLink from "../NavBar/NavLink";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";

import authContext from "../../context/authContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function Customer() {
  const [customer, setCustomer] = useState({});

  const authData = useContext(authContext);

  useEffect(() => {
    console.log(authData);
    getCustomer();
  }, []);

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/customer/" + authData.auth.id,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authData.auth.token,
          },
        }
      );
      if (response.data[0]) setCustomer(response.data[0]);
    } catch (error) {
      console.log(error);
      setCustomer({});
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Welcome To The Customer Dashboard !
      </h1>
      {/* <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
      {/* <Grid item xs={6} style={{ marginTop: 10 }}>
        <Item>
          <NavLink
            to={"/customer/account-list"}
            name="Account List"
            icon={<PeopleIcon />}
          />
        </Item>
      </Grid>
      <Grid item xs={6} style={{ marginTop: 10 }}>
        <Item>
          <NavLink
            to={"/customer/transfer-money"}
            name="Transfer Money"
            icon={<AccountBalanceIcon />}
          />
        </Item>
      </Grid> */}

      {/* </Grid> */}
    </Box>
  );
}
