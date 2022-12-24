import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

export default function LogOut() {
  return (
    <span onClick={() => alert("check src/LogOut component")}>
      <Tooltip title="LogOut">
        <LogoutIcon />
      </Tooltip>
    </span>
  );
}
