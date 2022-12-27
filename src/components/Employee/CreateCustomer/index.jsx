import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useState } from "react";
import authContext from "../../../context/authContext";
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.number().required(),
  street: Joi.string().required(),
  postalCode: Joi.number().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  nic: Joi.string().required(),
});
// email,
// name,
// password,
// phone,
// street,
// postalCode,
// city,
// country,
// nic,

export default function CreateCustomer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setcity] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const authData = useContext(authContext);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      email,
      name,
      password,
      phone,
      street,
      postalCode,
      city,
      country,
      name,
      nic,
    });

    if (error) {
      setError(error.details[0].message);
      console.log(error);
      setIsLording(false);
    } else {
      //api call here to login
      console.log(value);
      axios
        .post(
          "http://localhost:8002/customer",
          {
            email,
            name,
            password,
            phone,
            street,
            postalCode,
            city,
            country,
            name,
            nic,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": authData.auth.token,
            },
          }
        )
        .then(function (response) {
          setEmail("");
          setName("");
          setPassword("");
          setphone("");
          setStreet("");
          setPostalCode("");
          setcity("");
          setNic("");
          setCountry("");
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
        Create Customer
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
          value={email}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setPassword)}
          margin="normal"
          required
          fullWidth
          id="password"
          label="password"
          name="password"
          autoFocus
          value={password}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setName)}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setphone)}
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
          value={phone}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setStreet)}
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
          value={street}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setPostalCode)}
          margin="normal"
          required
          fullWidth
          id="postalCode"
          label="PostalCode"
          name="postalCode"
          value={postalCode}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setcity)}
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          value={city}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setCountry)}
          margin="normal"
          required
          fullWidth
          id="country"
          label="Country"
          name="country"
          value={country}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setNic)}
          margin="normal"
          required
          fullWidth
          id="nic"
          label="NIC"
          name="nic"
          value={nic}
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
