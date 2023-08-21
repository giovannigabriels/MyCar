import { Link, Outlet, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("name");
};

let buttonLogout = (
  <Link
    to={"/login"}
    className="btn-error"
    onClick={handleLogout}>
    Logout
  </Link>
);

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-white fixed top-0 w-full z-50 shadow-md">
        <div className="flex-1">
          <Link
            to={"/"}
            className="btn btn-ghost normal-case text-xl">
            Home
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/my-cars/create/0"}>Jual Mobil</Link>
            </li>
            <li>
              <Link to={"/my-cars"}>My Cars</Link>
            </li>
            <li>{buttonLogout}</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
