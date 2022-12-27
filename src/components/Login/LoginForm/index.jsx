import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../../context/authContext";
const Joi = require("joi");

const schema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [isLording, setIsLording] = useState(false);
  const auth = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.auth.role === "user") {
      navigate("/customer");
    } else if (auth.auth.role === "branch") {
      navigate("/branch");
    } else if (auth.auth.role === "staff") {
      navigate("/employee");
    }
  }, [auth]);

  const handleSubmit = () => {
    setError(undefined);
    setIsLording(true);

    const { value, error } = schema.validate({
      userName,
      password,
    });

    if (error) {
      setError(error.details[0].message);
      setIsLording(false);
    } else {
      console.log(value);
      //api call here to login
      axios
        .post("http://localhost:8004/signin", {
          id: userName,
          password,
        })
        .then(function (response) {
          console.log(response.data.role);
          auth.setAuth(response.data);
          setIsLording(false);
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          onChange={(e) => handleInputChange(e, setUserName)}
          margin="normal"
          required
          fullWidth
          id="userName"
          label="User Name"
          name="userName"
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
        <LoadingButton
          loading={isLording}
          onClick={() => handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  );
}
