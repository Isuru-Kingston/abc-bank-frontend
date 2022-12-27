import { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
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
  branch: Joi.string().required(),
});

export default function CreateAccountForm({ userId }) {
  const [branch, setBranch] = useState("");
  const [name, setName] = useState(userId);
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const authData = useContext(authContext);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      branch,
    });

    if (error) {
      setError(error.details[0].message);
      console.log(error);
      setIsLording(false);
    } else {
      console.log(value);

      axios
        .post(
          "http://localhost:8003/account/",
          {
            branch,
            owner: name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": authData.auth.token,
            },
          }
        )
        .then(function (response) {
          setBranch("");
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
        <AddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Account
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          onChange={(e) => handleInputChange(e, setName)}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
          disabled={true}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setBranch)}
          margin="normal"
          required
          fullWidth
          id="branch"
          label="Branch"
          name="branch"
          value={branch}
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
            {"account created successfully !"}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
