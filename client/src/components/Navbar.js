import { Link, Outlet, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

export default function Navbar() {
  return (
    <div>
    <div className="navbar bg-white fixed top-0 w-full z-50 shadow-md">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><a>Link</a></li>
        <li>
          <details>
            <summary>
              Parent
            </summary>
            <ul className="p-2 bg-base-100">
              <li><a>Link 1</a></li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    </div>
     <Outlet />
     </div>

  );
}
