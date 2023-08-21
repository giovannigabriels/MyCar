import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/userAction";
import { useEffect } from "react";

export default function Navbar() {
  const isLogin = localStorage.getItem("is_login");
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  useEffect(()=>{
    if(isLogin && access_token){
      dispatch(userLogin(true));
    } else {
      dispatch(userLogin(false));
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("id_user");
    localStorage.removeItem("is_login");
    dispatch(userLogin(false));
  };

  const handleJualMobil = () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      navigate("/my-cars/create/0");
    }
  };

  let buttonLog = isLogin ? (
    <Link
      to={"/"}
      className="btn-error"
      onClick={handleLogout}>
      Logout
    </Link>
  ) : (
    <Link
      to={"/login"}
      className="btn-info"
      onClick={handleLogout}>
      Sign In
    </Link>
  );

 
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
              <button
                to={"/my-cars/create/0"}
                onClick={handleJualMobil}>
                Jual Mobil
              </button>
            </li>
            {isLogin ? (
              <li>
                <Link to={"/my-cars"}>My Cars</Link>
              </li>
            ) : (
              ""
            )}
            <li>{buttonLog}</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
