import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";
import authContext from "../../../context/authContext";
import AccountCard from "../AccountCard";

export default function AccountList() {
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
      {customer.accounts &&
        customer.accounts.map((id, index) => {
          return <AccountCard accountNumber={id} key={index} />;
        })}
    </Box>
  );
}
