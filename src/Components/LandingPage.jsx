import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1 className="text-3xl text-center my-10">Landing Page</h1>

      <h3 className="text-center mb-10">
        Dashboard is a protected component. If you are not logged in and you try
        to navigate to the component you will be sent to the Login Page. Try It!
      </h3>
      <div className="flex justify-center">
        <Link
          to="/dashboard"
          className="bg-blue-400 hover:bg-orange-400 rounded px-2 py-2 "
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
