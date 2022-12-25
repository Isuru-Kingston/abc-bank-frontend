import { useState } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const Joi = require("joi");

const schema = Joi.object({
  accountNumber: Joi.number().required(),
  amount: Joi.number().required(),
});

export default function IndirectTransferForm() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);
  const [method, setMethod] = useState(0);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      accountNumber,
      amount,
    });

    if (error) {
      setError(error.details[0].message);
      console.log(error);
      setIsLording(false);
    } else {
      //api call here
      if (method === 0) {
        //withdraw api call
        setTimeout(() => {
          setError("server error(withdraw)");
          setIsLording(false);
        }, 2000);
      } else if (method === 1) {
        //deposit api call
        setTimeout(() => {
          setError("server error(deposit)");
          setIsLording(false);
        }, 2000);
      }
    }
  };

  const handleInputChange = (e, setInputState) => {
    setError(undefined);
    setInputState(e.target.value);
  };

  const handleMethodChange = (event, newValue) => {
    setMethod(newValue);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {method === 0 ? <CreditCardIcon /> : <AddCardIcon />}
      </Avatar>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
        <Tabs
          value={method}
          onChange={handleMethodChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="Withdraw" />
          <Tab label="Deposit" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 1 }}>
        <TextField
          onChange={(e) => handleInputChange(e, setAccountNumber)}
          margin="normal"
          required
          fullWidth
          id="accountNumber"
          label="Account Number"
          name="accountNumber"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setAmount)}
          margin="normal"
          required
          fullWidth
          id="amount"
          label="Amount"
          name="amount"
        />
        <LoadingButton
          loading={isLording}
          onClick={() => handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </LoadingButton>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  );
}
