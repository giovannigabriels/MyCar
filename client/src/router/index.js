import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
