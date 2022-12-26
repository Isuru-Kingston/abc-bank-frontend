import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import axios from "axios";

import authContext from "../../../context/authContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BranchDetails() {
  const [branches, setBranches] = useState([]);
  const [page, setPage] = useState(1);

  const authData = useContext(authContext);

  useEffect(() => {
    console.log("page......", page);
    getBranches();
  }, [page]);

  const getBranches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/branches/" + page,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authData.auth.token,
          },
        }
      );
      setBranches(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setBranches([]);
    }
  };

  const onChangePage = (event) => {
    if (event == "pre" && page > 1) {
      setPage(page - 1);
    }

    if (event == "next") {
      setPage(page + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TableContainer sx={{ minHeight: 400 }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Branch ID</StyledTableCell>
              <StyledTableCell>E-mail</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Postal Code</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.branch_id}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell>{row.address.postalCode}</StyledTableCell>
                <StyledTableCell>{row.address.city}</StyledTableCell>
                <StyledTableCell>{row.address.street}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup
        disableElevation
        variant="text"
        aria-label="text button group"
        style={{
          marginTop: 15,
        }}
      >
        <Button onClick={() => onChangePage("pre")}>{"Previous"}</Button>
        <Button onClick={() => onChangePage("next")}>{"Next"}</Button>
      </ButtonGroup>
    </div>
  );
}
