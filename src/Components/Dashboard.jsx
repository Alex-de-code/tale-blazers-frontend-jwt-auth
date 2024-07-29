import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Flame } from "lucide-react";
const URL = import.meta.env.VITE_BASE_URL;

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  // date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  // console.log("This is first user:", user);
  // const [userData, setUserData] = useState();
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${URL}/api/auth/user`, {
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
    <div
      className="bg-slate-900 pb-24 pt-10"
      style={{
        backgroundImage: `url(${`https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/v1712988101/pattern_ptsyaw.png`})`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-center mt-16">
        <div className="flex justify-center">
          <div className="bg-slate-900/70 shadow-2xl mx-96 rounded-2xl p-10 border-2 border-teal-300/50">
            <div className="flex justify-center">
              {user.profile_picture || isValidUrl(user.profile_picutre) ? (
                <img
                  src={user.profile_picture}
                  alt="user image"
                  className="w-48 rounded-full border-4 border-white"
                />
              ) : (
                <div>
                  <Flame
                    size={192}
                    className="rounded-full border-4 border-white p-3 bg-teal-400"
                  />
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold my-5 text-slate-200">
              Username:
            </h1>
            <h5 className="font-semibold bg-slate-100 rounded inline-block p-2 shadow text-slate-900">
              {user.username[0].toUpperCase()}
              {user.username.slice(1).toLowerCase()}
            </h5>
            <h6 className="text-2xl font-bold my-5 text-slate-200">
              Joined Tale Blazers on:
            </h6>
            <h2 className=" font-semibold bg-slate-100 rounded inline-block p-2 shadow text-slate-900">
              {formatDate(user.created_at)}
            </h2>
            <h1 className="text-2xl font-bold mt-5 text-slate-200">Bio:</h1>
            <h2 className="font-semibold bg-slate-100 rounded inline-block p-2 shadow w-96 mt-5 text-slate-900">
              {user.bio}
            </h2>
          </div>
        </div>
        <div className="text-center mt-5">
          <button
            onClick={handleLogout}
            className="bg-red-400 hover:bg-slate-400 rounded px-2 py-2 shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
