import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";

import authContext from "../../context/authContext";

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
    //   {
    //     "address": {
    //         "street": "No 204, Muwapatigewela",
    //         "postalCode": "32150",
    //         "city": "Dehiaththakandiya",
    //         "country": "Sri Lanka"
    //     },
    //     "_id": "63a7138fdf6af80f7b676284",
    //     "user_id": "user_2",
    //     "email": "isuru2@gmail.com",
    //     "phone": "0756131317",
    //     "nic": "982172462v",
    //     "accounts": [
    //         "63a7e103244cde1de3402691",
    //         "63a7f04e28a7290f5d57272e"
    //     ],
    //     "is_active": true,
    //     "createdAt": "2022-12-24T14:58:23.352Z",
    //     "updatedAt": "2022-12-25T06:40:14.756Z",
    //     "name": "Ishan Ravindu"
    // }
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Welcome Back {customer.name} !
      </h1>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h5">name : {customer.name}</Typography>
        <Typography variant="h5">email : {customer.email}</Typography>
        <Typography variant="h5">phone :{customer.phone}</Typography>
        <Typography variant="h5">NIC : {customer.nic}</Typography>
      </Paper>
    </Box>
  );
}
