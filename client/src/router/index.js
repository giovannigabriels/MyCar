import { createBrowserRouter, redirect } from "react-router-dom";
import DetailPage from "../components/DetailPage";
import Form from "../components/Form";
import Home from "../components/Home";
import Login from "../components/Login";
import MyCar from "../components/MyCar";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "my-cars/:type/:id",
        element: <Form />,
      },
      {
        path: "my-cars",
        element: <MyCar />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/login",
        element: <Login />,
        loader: () => {
          const isLogin = localStorage.getItem("is_login");
          if (isLogin) return redirect("/");
        },
      },
      {
        path: "/register",
        element: <Register />,
        loader: () => {
          const isLogin = localStorage.getItem("is_login");
          if (isLogin) return redirect("/");
        },
      },
    ],
  },
]);

export default router;
