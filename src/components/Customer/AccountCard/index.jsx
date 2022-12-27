import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountDetails from "./AccountDetails";
import authContext from "../../../context/authContext";
import axios from "axios";

export default function AccountCard({ accountNumber }) {
  const authData = React.useContext(authContext);
  const [account, setAccount] = React.useState({});

  React.useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8003/account/" + accountNumber,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authData.auth.token,
          },
        }
      );
      if (response.data) {
        setAccount(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Account ID : {account._id}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            <AccountDetails
              accountNumber={accountNumber}
              accountInfo={account}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
