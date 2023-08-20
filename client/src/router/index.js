import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
