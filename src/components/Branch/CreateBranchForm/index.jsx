import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.number().required(),
  street: Joi.string().required(),
  postalCode: Joi.number().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export default function CreateBranchForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setcity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      email,
      password,
      phone,
      street,
      postalCode,
      city,
      country,
    });

    if (error) {
      setError(error.details[0].message);
      console.log(error);
      setIsLording(false);
    } else {
      //api call here to login
      console.log(value);
      setTimeout(() => {
        setError("server error");
        setIsLording(false);
      }, 2000);
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
        Create Branch
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          onChange={(e) => handleInputChange(e, setEmail)}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoFocus
        />
        <TextField
          onChange={(e) => handleInputChange(e, setPassword)}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setphone)}
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setStreet)}
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setPostalCode)}
          margin="normal"
          required
          fullWidth
          id="postalCode"
          label="PostalCode"
          name="postalCode"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setcity)}
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setCountry)}
          margin="normal"
          required
          fullWidth
          id="country"
          label="Country"
          name="country"
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
