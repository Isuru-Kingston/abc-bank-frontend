import { useState, useContext } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import authContext from "../../../context/authContext";
const Joi = require("joi");

const schema = Joi.object({
  senderAccountNumber: Joi.string().required(),
  receiverAccountNumber: Joi.string().required(),
  amount: Joi.number().required(),
});

export default function DirectTransferForm({ id }) {
  const [senderAccountNumber, setSenderAccountNumber] = useState(id);
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const authData = useContext(authContext);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      senderAccountNumber,
      receiverAccountNumber,
      amount,
    });

    if (error) {
      setError(error.details[0].message);
      console.log(error);
      setIsLording(false);
    } else {
      console.log(value);

      axios
        .post(
          "http://localhost:8003/transaction/direct",
          {
            account: receiverAccountNumber,
            from: senderAccountNumber,
            amount,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": authData.auth.token,
            },
          }
        )
        .then(function (response) {
          setReceiverAccountNumber("");
          setAmount("");
          setIsLording(false);
          setSuccess(true);
        })
        .catch(function (error) {
          setError(error.response.data.error);
          setIsLording(false);
        });
    }
  };

  const handleInputChange = (e, setInputState) => {
    setError(undefined);
    setInputState(e.target.value);
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
        <AccountBalanceWalletIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Transfer Money
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          onChange={(e) => handleInputChange(e, setSenderAccountNumber)}
          margin="normal"
          required
          fullWidth
          id="senderAccountNumber"
          label="Your's Account Number"
          name="senderAccountNumber"
          value={senderAccountNumber}
          disabled={true}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setReceiverAccountNumber)}
          margin="normal"
          required
          fullWidth
          id="receiverAccountNumber"
          label="Receiver Account Number"
          name="receiverAccountNumber"
          value={receiverAccountNumber}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setAmount)}
          margin="normal"
          required
          fullWidth
          id="amount"
          label="Amount"
          name="amount"
          value={amount}
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
        {isSuccess && (
          <Alert
            onClose={() => {
              setSuccess(false);
            }}
          >
            {"Transaction successfull !"}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
