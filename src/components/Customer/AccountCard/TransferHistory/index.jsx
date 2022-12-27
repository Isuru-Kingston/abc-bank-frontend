import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import axios from "axios";
import authContext from "../../../../context/authContext";

export default function TransferHistory({ accountNumber }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="In" {...a11yProps(0)} />
          <Tab label="Out" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FromTransactionCard id={accountNumber} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ToTransactionCard id={accountNumber} />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
      {transactions &&
        transactions.map((transaction, index) => {
          return (
            <div key={index}>
              <Typography>{transaction._id}</Typography>
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
      {transactions &&
        transactions.map((transaction, index) => {
          return (
            <div key={index}>
              <Typography>{transaction._id}</Typography>
            </div>
          );
        })}
    </>
  );
};
