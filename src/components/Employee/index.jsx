import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NavLink from "../NavBar/NavLink";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

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

export default function Employee() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Welcome To The Employee Dashboard !
      </h1>
      <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <NavLink
              to={"/employee/create-account"}
              name="Create Account"
              icon={<AccountBalanceIcon />}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <NavLink
              to={"/employee/create-customer"}
              name="Create Customer"
              icon={<PeopleIcon />}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <NavLink
              to={"/employee/indirect-transfer"}
              name="Indirect Transfer"
              icon={<PersonAddAltIcon />}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <NavLink
              to={"/employee/direct-transfer"}
              name="Direct Transfer"
              icon={<AddHomeWorkIcon />}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
