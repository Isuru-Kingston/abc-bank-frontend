import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NavLink from "../../NavBar/NavLink";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DirectTransferForm from "../../Account/DirectTransferForm";

import authContext from "../../../context/authContext";

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

export default function AccountList() {
  const [customer, setCustomer] = useState({});

  const authData = useContext(authContext);

  useEffect(() => {
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
          return <AccountCard id={id} key={index} />;
        })}
    </Box>
  );
}

const AccountCard = ({ id }) => {
  const authData = useContext(authContext);
  const [account, setAccount] = useState({});

  useEffect(() => {
    getAccount();
  }, [id]);

  console.log();

  const getAccount = async () => {
    try {
      const response = await axios.get("http://localhost:8003/account/" + id, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authData.auth.token,
        },
      });
      if (response.data) {
        setAccount(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid item xs={6} style={{ marginTop: 10 }}>
      <Item>
        <h4>{account ? account._id : ""}</h4>
        <FromTransactionCard id={account ? account._id : ""} />
        <ToTransactionCard id={account ? account._id : ""} />
        <TransferModal id={account ? account._id : ""} />
      </Item>
    </Grid>
  );
};

const FromTransactionCard = ({ id }) => {
  const authData = useContext(authContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (id) {
      getTransactions();
    }
  }, [id]);

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8003/transaction/by-sender/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authData.auth.token,
          },
        }
      );
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>From----------></div>
      {transactions &&
        transactions.map((transaction, index) => {
          return (
            <div>
              <h5>{transaction._id}</h5>
            </div>
          );
        })}
    </>
  );
};

const ToTransactionCard = ({ id }) => {
  const authData = useContext(authContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (id) {
      getTransactions();
    }
  }, [id]);

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8003/transaction/by-account/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authData.auth.token,
          },
        }
      );
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>To----------></div>
      {transactions &&
        transactions.map((transaction, index) => {
          return (
            <div>
              <h5>{transaction._id}</h5>
            </div>
          );
        })}
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TransferModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Transfer</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DirectTransferForm id={id} />
        </Box>
      </Modal>
    </div>
  );
};
