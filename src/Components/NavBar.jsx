import { Flame, LogIn, LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Login from "./Login";

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
    <div className="py-4 bg-slate-900/90 flex flex-row justify-between">
      <Link to="/" className="text-slate-100">
        <div className="flex items-center ">
          <Flame className="ml-8 text-teal-400" size={36} />
          <span className="text-teal-400 text-2xl mr-1">Tale</span>{" "}
          <span className="text-orange-500 text-2xl">Blazers</span>
        </div>
      </Link>
      <span className="flex">
        <Link
          to="/dashboard"
          className="bg-white hover:bg-teal-400 rounded p-1 flex justify-around mb-1 mr-4 mt-1"
        >
          <UserRound />
        </Link>

        {!toggleLogin ? (
          <Link
            to={"/login"}
            className="bg-white hover:bg-green-400 rounded p-1 ml-auto mb-1 mr-8 mt-1"
          >
            <span className="flex flex-row">
              Login <LogIn className="ml-1" />
            </span>
          </Link>
        ) : (
          <div className="bg-white hover:bg-red-400 rounded p-1 ml-auto mr-8 mb-1 mt-1">
            {/* {user && <span>Hello, {user.username.toUpperCase()}? | </span>} */}
            <Link onClick={handleLogout}>
              <span className="flex flex-row">
                Log out <LogOut className="ml-1" />
              </span>
            </Link>
          </div>
        )}
      </span>
    </div>
  );
};

export default NavBar;
