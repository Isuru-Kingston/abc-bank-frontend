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
  phone: Joi.number().required(),
  street: Joi.string().required(),
  postalCode: Joi.number().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  possition: Joi.string().required(),
  branch: Joi.string().required(),
  nic: Joi.string().required(),
});

export default function CreateEmplyeeForm() {
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setcity] = useState("");
  const [country, setCountry] = useState("");
  const [possition, setposition] = useState("");
  const [branch, setBranch] = useState("");
  const [nic, setNic] = useState("");
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      email,
      phone,
      street,
      postalCode,
      city,
      country,
      possition,
      branch,
      nic,
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
        Create Emplyee
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
        <TextField
          onChange={(e) => handleInputChange(e, setposition)}
          margin="normal"
          required
          fullWidth
          id="possition"
          label="Possition"
          name="possition"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setBranch)}
          margin="normal"
          required
          fullWidth
          id="branch"
          label="Branch"
          name="branch"
        />
        <TextField
          onChange={(e) => handleInputChange(e, setNic)}
          margin="normal"
          required
          fullWidth
          id="nic"
          label="NIC"
          name="nic"
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
