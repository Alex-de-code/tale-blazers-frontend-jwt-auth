import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  // console.log("This is first user:", user);
  // const [userData, setUserData] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  return (
    <div>
      <h2 className="bg-red-400 text-center text-2xl">Dashboard Component</h2>

      {user && (
        <h1 className="text-2xl my-8 ml-8">
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}

      {/* {userData.map(
        ({ id, username, email, profile_picture, bio, created_at }) => (
          <div className="" key={id}>
            <div>username</div>
          </div>
        )
      )} */}

      {/* Use user data as needed, for example: */}

      <button
        onClick={handleLogout}
        className="bg-red-400 hover:bg-slate-400 rounded px-2 py-2 shadow ml-8"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
