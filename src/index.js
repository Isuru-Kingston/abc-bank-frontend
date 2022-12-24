import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// roboto font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login from "./components/Login";
import Branch from "./components/Branch";
import BranchDetails from "./components/Branch/BranchDetails";
import EmplyeeDetails from "./components/Branch/EmplyeeDeatils";
import CreateBranchForm from "./components/Branch/CreateBranchForm";
import CreateEmplyeeForm from "./components/Branch/CreateEmplyeeForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "branch",
        element: <Branch />,
      },
      {
        path: "branch/branch-details",
        element: <BranchDetails />,
      },
      {
        path: "branch/employee-details",
        element: <EmplyeeDetails />,
      },
      {
        path: "branch/create-branch",
        element: <CreateBranchForm />,
      },
      {
        path: "branch/create-employee",
        element: <CreateEmplyeeForm />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
