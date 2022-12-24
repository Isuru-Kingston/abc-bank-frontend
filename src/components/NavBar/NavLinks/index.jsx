import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useLocation } from "react-router-dom";
import NavLink from "../NavLink";

export default function NavLinks() {
  const { pathname } = useLocation();
  if (pathname.substring(0, 7) === "/branch") {
    return (
      <>
        <NavLink to={"/branch"} name="Dashboard" icon={<DashboardIcon />} />
        <NavLink
          to={"/branch/branch-details"}
          name="Branch Details"
          icon={<AccountBalanceIcon />}
        />
        <NavLink
          to={"/branch/employee-details"}
          name="Employee Details"
          icon={<PeopleIcon />}
        />
        <NavLink
          to={"/branch/create-branch"}
          name="Create Branch"
          icon={<AddHomeWorkIcon />}
        />
        <NavLink
          to={"/branch/create-employee"}
          name="Create Employee"
          icon={<PersonAddAltIcon />}
        />
      </>
    );
  } else {
    return null;
  }
}
