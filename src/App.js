import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar>
        <Outlet />
      </NavBar>
    </>
  );
}

export default App;
