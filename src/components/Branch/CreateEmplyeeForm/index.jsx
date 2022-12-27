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
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string()
    .valid(Joi.ref("password"), "pasword should match with confirm password")
    .required(),
  phone: Joi.number().required(),
  street: Joi.string().required(),
  postalCode: Joi.number().required(),
  city: Joi.string().required(),
  possition: Joi.string().required(),
  nic: Joi.string().required(),
});

export default function CreateEmplyeeForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [phone, setphone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setcity] = useState("");
  const [possition, setposition] = useState("");
  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
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
      confirmpassword,
      phone,
      street,
      postalCode,
      city,
      possition,
      nic,
    });

    if (error) {
      setError(error.details[0].message);
      console.log(error);
      setIsLording(false);
    } else {
      console.log(value);

      axios
        .post(
          "http://localhost:8002/employee",
          {
            email,
            name,
            password,
            phone,
            street,
            postalCode,
            city,
            country: "Sri Lanka",
            nic,
            possition,
            branch: authData.auth.id,
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
          setConfirmpassword("");
          setphone("");
          setStreet("");
          setPostalCode("");
          setcity("");
          setNic("");
          setposition("");
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
        Create Emplyee
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
          autoFocus
        />
        <TextField
          onChange={(e) => handleInputChange(e, setEmail)}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={email}
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
          label="Address"
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
          onChange={(e) => handleInputChange(e, setposition)}
          margin="normal"
          required
          fullWidth
          id="possition"
          label="Possition"
          name="possition"
          value={possition}
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
        <TextField
          onChange={(e) => handleInputChange(e, setPassword)}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
        />
        <TextField
          onChange={(e) => handleInputChange(e, setConfirmpassword)}
          margin="normal"
          required
          fullWidth
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          id="confirmpassword"
          value={confirmpassword}
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
            {"branch created successfully !"}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
