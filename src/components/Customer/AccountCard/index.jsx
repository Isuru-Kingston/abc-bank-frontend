import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountDetails from "./AccountDetails";

export default function AccountCard({ accountNumber }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Account ID : {accountNumber}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            <AccountDetails accountNumber={accountNumber} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
