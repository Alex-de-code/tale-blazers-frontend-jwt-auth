import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Landing Page</h1>

      <h3>
        Dashboard is a protected component. If you are not logged in and you try
        to navigate to the component you will be sent to the Login Page. Try It!
      </h3>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default LandingPage;
