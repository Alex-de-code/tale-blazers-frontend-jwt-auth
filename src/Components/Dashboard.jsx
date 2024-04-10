import { useOutletContext } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    <div>
      <br />
      <br />
      <h2 className="bg-red-400">Dashboard Component</h2>

      {user && (
        <h1>
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}

      {/* Use user data as needed, for example: */}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
