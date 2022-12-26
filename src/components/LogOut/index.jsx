import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../context/authContext";

export default function LogOut() {
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.setAuth({});
    navigate("/login");
  };

  return (
    <span onClick={handleLogOut}>
      <Tooltip title="LogOut">
        <LogoutIcon />
      </Tooltip>
    </span>
  );
}
