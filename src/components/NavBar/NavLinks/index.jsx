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
  } else if (pathname.substring(0, 9) === "/employee") {
    return (
      <>
        <NavLink to={"/employee"} name="Dashboard" icon={<DashboardIcon />} />
        <NavLink
          to={"/employee/create-account"}
          name="Create Account"
          icon={<AccountBalanceIcon />}
        />
        <NavLink
          to={"/employee/create-customer"}
          name="Create Customer"
          icon={<PeopleIcon />}
        />
        <NavLink
          to={"/employee/indirect-transfer"}
          name="Indirect Transfer"
          icon={<PersonAddAltIcon />}
        />
        <NavLink
          to={"/employee/direct-transfer"}
          name="Direct Transfer"
          icon={<AddHomeWorkIcon />}
        />
      </>
    );
  } else if (pathname.substring(0, 9) === "/customer") {
    return (
      <>
        <NavLink to={"/customer"} name="Dashboard" icon={<DashboardIcon />} />
        <NavLink
          to={"/customer/account-list"}
          name="Account List"
          icon={<AccountBalanceIcon />}
        />
        <NavLink
          to={"/customer/transfer-money"}
          name="Transfer Money"
          icon={<PeopleIcon />}
        />
      </>
    );
  } else {
    return null;
  }
}
