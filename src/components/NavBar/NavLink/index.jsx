import React from "react";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useLocation, Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

export default function NavLink({ icon = <NotInterestedIcon />, to, name }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={to}
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
    >
      <ListItemButton selected={to === pathname ? true : false}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </Link>
  );
}
