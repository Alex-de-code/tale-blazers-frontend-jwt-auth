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
    <div className="py-4 bg-yellow-400 flex flex-row justify-between">
      {/* <h1>Navbar Component</h1> */}
      <h2 className="ml-8 text-2xl">
        <Link to="/">Tale Blazers</Link>
      </h2>

      <span className="flex">
        <Link
          to="/dashboard"
          className="bg-blue-400 hover:bg-orange-400 rounded px-2 pt-1 flex justify-around mr-2"
        >
          Dashboard
        </Link>

        {!toggleLogin ? (
          <Link
            to={"/login"}
            className="bg-white hover:bg-green-400 rounded px-2 pt-1 ml-auto mr-8"
          >
            <span>Login</span>
          </Link>
        ) : (
          <div className="bg-white hover:bg-red-400 rounded px-2 pt-1 ml-auto mr-8">
            {user && <span>Hello, {user.username.toUpperCase()}? | </span>}
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
