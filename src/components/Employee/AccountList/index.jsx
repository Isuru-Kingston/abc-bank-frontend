import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import authContext from "../../../context/authContext";
import AccountCard from "../../Customer/AccountCard";
import { useLocation } from "react-router-dom";
import CreateAccount from "../../Account/CreateAccout";

export default function AccountListHolder() {
  const [customer, setCustomer] = useState({});
  const [isHide, setIsHide] = useState(true);
  const authData = useContext(authContext);
  const location = useLocation();

  useEffect(() => {
    console.log(authData);
    getCustomer();
  }, []);

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/customer/" + location.state.userId,
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
      <Button
        onClick={() => setIsHide(!isHide)}
        style={{ marginBottom: "20px" }}
        variant="contained"
      >
        {isHide ? "Create Account" : "cancel"}
      </Button>
      {!isHide && <CreateAccount userId={location.state.userId} />}
      {customer.accounts &&
        customer.accounts.map((id, index) => {
          return <AccountCard accountNumber={id} key={index} />;
        })}
    </Box>
  );
}
