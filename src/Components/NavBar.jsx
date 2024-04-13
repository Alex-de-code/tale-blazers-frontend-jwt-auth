import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="py-4 bg-slate-500 flex flex-row justify-between">
      {/* <h1>Navbar Component</h1> */}
      <Link to="/" className="text-slate-100">
        <div className="flex">
          <Flame className="ml-8 text-teal-400" size={36} />
          <h2 className="text-2xl mt-1">Tale Blazers</h2>
        </div>
      </Link>
      <span className="flex">
        <Link
          to="/dashboard"
          className="bg-blue-400 hover:bg-orange-400 rounded p-1 flex justify-around mb-1 mr-4 mt-1"
        >
          Dashboard
        </Link>

        {!toggleLogin ? (
          <Link
            to={"/login"}
            className="bg-white hover:bg-green-400 rounded p-1 ml-auto mb-1 mr-8 mt-1"
          >
            <span>Login</span>
          </Link>
        ) : (
          <div className="bg-white hover:bg-red-400 rounded p-1 ml-auto mr-8 mb-1 mt-1">
            {/* {user && <span>Hello, {user.username.toUpperCase()}? | </span>} */}
            <Link onClick={handleLogout}>
              <span>Logout</span>
            </Link>
          </div>
        )}
      </span>
    </div>
  );
};

export default NavBar;
